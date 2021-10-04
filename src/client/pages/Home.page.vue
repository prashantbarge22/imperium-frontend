<template>
    <div>

        <layout v-show="!protocolUsedOnMultipleTabs">

            <div slot="content">

                <web-dollar-hero/>

                <what-is-hero/>

                <peer-to-peer-hero/>

                <newsletter-hero/>

                <new-crypto-generation-hero/>

                <blockchain-distribution-hero/>

                <miner-pool-hero v-show="!poolActivated"/>

                <pool-hero v-show="poolActivated"/>

                <paper/>

                <timeline-hero/>

                <team-hero/>

                <know-us-hero/>

            </div>

        </layout>

        <multiple-tabs v-show="protocolUsedOnMultipleTabs"/>

    </div>
</template>

<script>
    import Layout from "client/components/layout/Layout.vue";
    import PoolHero from "client/components/heros/mining-pool/pool/Pool.hero.vue";
    import MinerPoolHero from "client/components/heros/mining-pool/miner-pool/Miner-Pool.hero.vue";
    import NewsletterHero from "client/components/heros/Newsletter.hero.vue";
    import TeamHero from "client/components/heros/Team.hero.vue";
    import WebDollarHero from "client/components/heros/WebDollar.hero.vue";
    import WhatIsHero from "client/components/heros/About.hero.vue";
    import PeerToPeerHero from "client/components/heros/Peer-To-Peer.hero.vue";
    import TimelineHero from "client/components/heros/Timeline.hero.vue";
    import KnowUsHero from "client/components/heros/Media.hero.vue";
    import FaqHero from "client/components/heros/Faq.hero.vue";
    import PartnersHero from "client/components/heros/Partners.hero.vue";
    import NewCryptoGenerationHero from "client/components/heros/Features.hero.vue";
    import BlockchainDistributionHero from "client/components/heros/Blockchain-Distribution.hero.vue";
    import MultipleTabs from "../components/heros/Multiple-Tabs.hero.vue";
    import Paper from "../components/heros/Paper.hero.vue";
    import WebDollarEmitter from './../../utils/WebDollarEmitter';

    export default {

        name: "ViewHome",

        components: {
            Layout,
            TeamHero,
            WebDollarHero,
            WhatIsHero,
            PeerToPeerHero,
            TimelineHero,
            KnowUsHero,
            FaqHero,
            PartnersHero,
            NewCryptoGenerationHero,
            BlockchainDistributionHero,
            PoolHero,
            MinerPoolHero,
            MultipleTabs,
            NewsletterHero,
            Paper
        },

        data: () => {
            return {
                protocolUsedOnMultipleTabs: false,
                poolActivated: true,
            };
        },

        mounted() {
            const self = this;

            this.$nextTick(() => {
                WebDollarEmitter.on('blockchain/status', self._blockchainStatus);
                WebDollarEmitter.on('main-pools/status', self.initializePool);
                WebDollarEmitter.on('blockchain/logs', self._blockchainLogs);
                WebDollarEmitter.on('miner-pool/status', self._minerPoolStatus);
                WebDollarEmitter.on('pools/status', self._poolsStatus);
                WebDollarEmitter.once('blockchain/mining/address', self._prefillPaymentIfPaymentPropsAreAvailable);

                self.loadPoolSettings();
            });

        },

        destroyed() {
            WebDollarEmitter.off('blockchain/status', this._blockchainStatus);
            WebDollarEmitter.off('main-pools/status', this.initializePool);
            WebDollarEmitter.off('blockchain/logs', this._blockchainLogs);
            WebDollarEmitter.off('miner-pool/status', this._minerPoolStatus);
            WebDollarEmitter.off('pools/status', this._poolsStatus);
            WebDollarEmitter.off('blockchain/mining/address', this._prefillPaymentIfPaymentPropsAreAvailable);
        },

        methods: {
            _blockchainStatus(data) {
                //console.log("blockchain/status - " + data.message);
                if (data.message === "Single Window") {
                    this.protocolUsedOnMultipleTabs = false;
                } else if (data.message === "Multiple Windows Detected") {
                    this.protocolUsedOnMultipleTabs = true;
                } else if (data.message === "Wallet Loaded Successfully"
                           || data.message === "Wallet Creating New Wallet") {
                    // Now that wallet is loaded, check ?import= if we have a new address to add
                    if (typeof this.$route.query.import === "string") {
                        try {
                            this._validateBase64String(this.$route.query.import);  // throws error if faulty
                            let wallet = window.atob(this.$route.query.import);
                            // No matter if the wallet JSON is technically valid, if it doesn't start with
                            // the version key, we're not looking at it.
                            if (wallet.substring(0, 11) === '{"version":') {
                                let data = JSON.parse(wallet);
                                if (this._validateWalletObject(data)) {  // throws error if faulty
                                    let answer = WebDollar.Blockchain.Wallet.importAddressFromJSON(data);
                                    if (answer.result === true) {
                                        console.log("Query-string Address Import Successful!");
                                    }
                                }
                            } else {
                                throw new Error("Wallet JSON does not start with version");
                            }
                        } catch (err) {
                            console.log("Error decoding wallet-address import querystring: " + err);
                        }
                    }
                }
            },

            _validateBase64String(data) {
                let i, c, valid;
                for (i=0; i < data.length; i++) {
                    valid = false;
                    c = data[i];
                    if (c >= 'A' && c <= 'Z') {
                        valid = true;
                    }
                    if (c >= 'a' && c <= 'z') {
                        valid = true;
                    }
                    if (c >= '1' && c <= '9') {
                        valid = true;
                    }
                    if (c === '0' || c === '+' || c === '/' || c === '=') {
                        valid = true;
                    }
                    if (!valid) {
                        throw new Error("Invalid base64");
                    }
                }
                return true;
            },

            _validateWalletObject(data) {
                let errors = "";

                if (typeof data.version === "undefined") {
                    errors = errors + "missing version/";
                } else {
                    // Validation for version 0.1
                    if (data.version === "0.1") {
                        if (typeof data.address === "undefined") {
                            errors = errors + "missing address/";
                        } else if (data.address.length !== 40 ||
                            data.address.substring(0,5) !== 'WEBD$' ||
                            data.address[39] != '$') {
                            errors = errors + "malformed address/";
                        }
                        if (typeof data.publicKey === "undefined") {
                            errors = errors + "missing publicKey/";
                        } else if (data.publicKey.length !== 64 ||
                            !this._validateHexStream(data.publicKey)) {
                            errors = errors + "malformed publicKey/";
                        }
                        if (typeof data.privateKey === "undefined") {
                            errors = errors + "missing privateKey/";
                        } else if (data.privateKey.length !== 138 ||
                            !this._validateHexStream(data.privateKey)) {
                            errors = errors + "malformed privateKey/";
                        }
                        let allKeys = Object.keys(data);
                        let i;
                        for (i=0; i < allKeys.length; i++) {
                            if (allKeys[i] !== "version" &&
                                allKeys[i] !== "address" &&
                                allKeys[i] !== "publicKey" &&
                                allKeys[i] !== "privateKey") {
                                errors = errors + "unrecognized key: " + allKeys[i] + "/";
                            }
                        }
                    } else {
                        errors = errors + "invalid wallet version/";
                    }
                }
                if (errors !== "") {
                    throw new Error(errors);
                }
                return true;
            },

            _validateHexStream(data) {  // returns true or false, doesn't throw
                let i, c, valid;
                for (i=0; i < data.length; i++) {
                    c = data[i];
                    valid = false;
                    if (c >= 'A' && c <= 'F') {
                        valid = true;
                    }
                    if (c >= 'a' && c <= 'f') {
                        valid = true;
                    }
                    if (c >= '1' && c <= '9') {
                        valid = true;
                    }
                    if (c === '0') {
                        valid = true;
                    }
                    if (!valid) {
                        return false;
                    }
                }
                return true;
            },

            _blockchainLogs(data) {
                switch (data.message) {

                    case "You mined way too many blocks":
                        setTimeout(() => {
                            location.reload();
                        }, 15 * 1000);

                        break;
                }
            },

            _minerPoolStatus(data) {
                if (data.message === "Miner Pool Started changed") {
                    this.poolActivated = !data.result;
                }
            },

            _poolsStatus(data) {
                if (data.message === "Pool Started changed") {
                    this.poolActivated = data.result;
                }
            },

            async initializePool(data) {

                if (data.message === "Pool Initialized") {
                    await WebDollar.Blockchain.MinerPoolManagement.setMinerInitialPoolURL(this.$route.params.pathMatch);
                }
            },

            loadPoolSettings() {
                if (WebDollar.Blockchain.PoolManagement !== undefined && WebDollar.Blockchain.PoolManagement.poolStarted) this.poolActivated = true;
                else if (WebDollar.Blockchain.MinerPoolManagement !== undefined && WebDollar.Blockchain.MinerPoolManagement.minerPoolStarted) this.poolActivated = false;
                else this.poolActivated = false;
            },

            _prefillPaymentIfPaymentPropsAreAvailable() {
                let toAddress = this.$route.params.toAddress;

                if (!toAddress) {
                    return;
                }

                WebDollarEmitter.emit('wallet/transfer', {
                    toAddress: toAddress,
                    toAmount: this.$route.params.toAmount,
                    toFee: this.$route.params.toFee
                });
            }
        },

        async asyncData({ store, route: { params: { a, b, c, d, e, f }}}) {
            return true;
        },
    };
</script>
