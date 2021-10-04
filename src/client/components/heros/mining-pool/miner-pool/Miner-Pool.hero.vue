<template>
    <div id="" class="p2pNetwork">
        <div id="createPoolSection" cl>
            <h1 style="text-align:center" class="alignCenter bigMarginBottom">POOL Mining</h1>
            <div class="distributionContainer sectionCenteredWidth stat-columns">

                <div class="verticalAlignMiddle">
                    <div class="distributionGrid poolDescription">
                        <div class="distributionGrid borderBottom ">
                            <h2 class="subtitle">{{ this.minerPoolStatus === 'miner' ? 'REFERRAL QUICK ACTIONS' : 'POOL QUICK ACTIONS'}}</h2>
                        </div>

                        <!--<router-link class="copyPoolLink" to="/pool">-->
                        <!--Referrals Dashboard-->
                        <!--</router-link>-->

                        <div class='stat-box-link'>
                            <p style="text-align:center" v-show="this.poolURL !== ''" @click="copyToClipboard">
                                <span class="yellowColor">Copy Invite link</span><span class="stat-box-small">and send it to your friends</span>
                            </p>
                        </div>

                        <div class='stat-box-link'>
                            <p style="text-align:center">
                                <router-link class="" to="/pool">
                                    <span class="yellowColor">See Your Referrals</span>
                                    <span class="stat-box-small">and monitor your earnings</span>
                                </router-link>
                            </p>
                        </div>

                        <div class='stat-box'>
                            <span style="text-align:center">
                                <p class="stat-box-small">Referral Reward:</p><br>
                                <p :class="this.isNotNullColor"> {{this.poolReferralFee}}% IDLL</p>
                                <p class="stat-box-small">from each friend you invite</p>
                                <!--Being confirmed: <span class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksBeingConfirmed}} </span> Unconfirmed <span class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksUnconfirmed}} </span>-->
                            </span>
                        </div>

                        <!-- <a :href="this.poolWebsite">
                          <div class='stat-box-link'>
                            <span class="oneLineText">
                              Mining in: <span class="normalSpan yellowColor"> {{this.poolName}}</span>
                            </span>
                          </div>
                        </a> -->
                        <!--<div v-if="this.poolReferralFee===0" class="poolQuickActions">-->
                        <!--<span class="noMarginTop">Your current pools doesn't has referral system.</span>-->
                        <!--<router-link class="copyPoolLink" to="/pool">-->
                        <!--Create Your Own Pool-->
                        <!--</router-link>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="verticalAlignMiddle">
                    <pool-statistics ref="poolStatistics" statsType="miner" :poolName="poolName" :poolWebsite="poolWebsite" :poolURL="poolURL" :poolFee="poolFee" :poolReferralFee="poolReferralFee"
                                     :poolServers="poolServers" :poolStatus="minerPoolStatus"
                                     :poolHashes="poolHashes" :poolMinersOnline="poolMinersOnline" :poolBlocksConfirmed="poolBlocksConfirmed" :poolBlocksUnconfirmed="poolBlocksUnconfirmed"
                                     :poolBlocksConfirmedAndPaid="poolBlocksConfirmedAndPaid"
                                     :poolTimeRemaining="poolTimeRemaining" :rewardReferralTotal="rewardReferralTotal" :rewardReferralConfirmed="rewardReferralConfirmed"
                                     :poolBlocksBeingConfirmed="poolBlocksBeingConfirmed" :networkHashRate="networkHashRate">
                    </pool-statistics>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Clipboard from 'v-clipboard';
    import PoolStatistics from '../pool/components/Pool-Statistics.vue';
    import WebDollarEmitter from '../../../../../utils/WebDollarEmitter';

    Vue.use(Clipboard);

    export default {

        name: 'miner-pool',

        data: () => {
            return {

                poolName: '',
                poolWebsite: '',
                poolURL: '',
                poolFee: 0,
                poolReferralFee: 0,
                poolServers: {},
                minerPoolStatus: '',

                poolHashes: 0,
                poolMinersOnline: 0,
                poolBlocksConfirmed: 0,
                poolBlocksConfirmedAndPaid: 0,
                poolBlocksBeingConfirmed: 0,
                poolBlocksUnconfirmed: 0,

                poolTimeRemaining: 0,

                poolURLReferral: '',

                rewardReferralTotal: 0,
                rewardReferralConfirmed: 0,

                subscribedMinerPoolStatistics: false,
                networkHashRate: 0,
            };
        },
        components: {
            PoolStatistics
        },

        computed: {

            numberOfConnectedHosts() {

                let enabledHosts = 0;

                for (let key in this.poolServers) {
                    if (this.poolServers[key].connected) enabledHosts++;
                }

                return enabledHosts;

            },

            isNotNullColor() {

                if (this.numberOfConnectedHosts === 0) return 'redColor';
                return 'greenColor';

            },

        },

        methods: {

            copyToClipboard() {
                this.$clipboard(this.poolURLReferral);
            },

            loadPoolData() {

                if (WebDollar.Blockchain.MinerPoolManagement === undefined) {

                    this.minerPoolStatus = 'not initialized';

                } else {

                    if (WebDollar.Blockchain.MinerPoolManagement.minerPoolInitialized) this.minerPoolStatus = 'initialized';
                    if (WebDollar.Blockchain.MinerPoolManagement.minerPoolOpened) this.minerPoolStatus = 'configured';
                    if (WebDollar.Blockchain.MinerPoolManagement.minerPoolStarted) this.minerPoolStatus = 'started';

                    this.poolFee = Math.floor(WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolFee * 100, 2);
                    this.poolReferralFee = Math.floor(WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolReferralFee * 100, 2);
                    this.poolURL = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolURL;
                    this.poolName = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName;
                    this.poolWebsite = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolWebsite;

                    this.poolURLReferral = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolURLReferral;

                    this.getPoolServers();

                    this.subscribeMinerPoolStatistics();

                }


            },

            getPoolServers() {

                let poolServers = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolServers;
                this.poolServers = WebDollar.Applications.PoolsUtilsHelper.getPoolServersStatus(poolServers);

            },

            subscribeMinerPoolStatistics() {

                if (this.subscribedMinerPoolStatistics) return;

                this.subscribedMinerPoolStatistics = true;

                this.poolHashes = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolHashes;
                this.poolMinersOnline = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolMinersOnline.length;
                this.poolBlocksConfirmed = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolBlocksConfirmed;
                this.poolBlocksConfirmedAndPaid = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolBlocksConfirmedAndPaid;
                this.poolBlocksUnconfirmed = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolBlocksUnconfirmed;
                this.poolBlocksBeingConfirmed = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolBlocksBeingConfirmed;
                this.poolTimeRemaining = WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.poolTimeRemaining;


                WebDollar.Blockchain.MinerPoolManagement.minerPoolStatistics.emitter.on('miner-pool/statistics/update', (data) => {

                    this.poolHashes = data.poolHashes;
                    this.poolMinersOnline = data.poolMinersOnline;
                    this.poolBlocksConfirmed = data.poolBlocksConfirmed;
                    this.poolBlocksConfirmedAndPaid = data.poolBlocksConfirmedAndPaid;
                    this.poolBlocksUnconfirmed = data.poolBlocksUnconfirmed;
                    this.poolBlocksBeingConfirmed = data.poolBlocksBeingConfirmed;
                    this.poolTimeRemaining = data.poolTimeRemaining;

                });

            },

            _minerPoolReferralUrl(data) {
                this.poolURLReferral = data.poolURLReferral;
            },

            _minerPoolReferralConfirmedReward(data) {
                this.rewardReferralConfirmed = data.referralConfirmedReward;
            },

            _minerPoolReferralTotalReward(data) {
                this.rewardReferralTotal = data.referralTotalReward;
            },

            _blockchainNewNetworkHashRate(networkHashRate) {
                this.networkHashRate = networkHashRate;
            }
        },

        mounted() {
            const self = this;
            this.$nextTick(() => {
                WebDollarEmitter.on('miner-pool/status', self.loadPoolData);
                WebDollarEmitter.on('miner-pool/settings', self.loadPoolData);
                WebDollarEmitter.on('miner-pool/referral-url', self._minerPoolReferralUrl);

                self.loadPoolData();

                WebDollarEmitter.on('miner-pool/referral-confirmed-reward', self._minerPoolReferralConfirmedReward);
                WebDollarEmitter.on('miner-pool/referral-total-reward', self._minerPoolReferralTotalReward);

                if (typeof WebDollar.Blockchain.MinerPoolManagement !== 'undefined') {
                    self.rewardReferralTotal = WebDollar.Blockchain.MinerPoolManagement.totalReferralReward;
                    self.rewardReferralConfirmed = WebDollar.Blockchain.MinerPoolManagement.confirmedReferralReward;
                }

                //servers
                WebDollarEmitter.on('miner-pool/servers-connections', self.getPoolServers);
                WebDollarEmitter.on('blockchain/new-network-hash-rate', self._blockchainNewNetworkHashRate);
            });
        },

        destroyed() {
            WebDollarEmitter.off('miner-pool/status', this.loadPoolData);
            WebDollarEmitter.off('miner-pool/settings', this.loadPoolData);
            WebDollarEmitter.off('miner-pool/referral-url', this._minerPoolReferralUrl);
            WebDollarEmitter.off('miner-pool/referral-confirmed-reward', this._minerPoolReferralConfirmedReward);
            WebDollarEmitter.off('miner-pool/referral-total-reward', this._minerPoolReferralTotalReward);
            WebDollarEmitter.off('miner-pool/servers-connections', this.getPoolServers);
            WebDollarEmitter.off('blockchain/new-network-hash-rate', this._blockchainNewNetworkHashRate);
        }
    };
</script>

<style>
    .poolQuickActions {
        max-width: 540px;
        margin: auto;
    }

    .poolQuickActions span {
        text-align: center;
        margin-top: 20px;
        color: #fff;
    }

    .noMarginTop {
        margin-top: 0 !important;
        margin-bottom: 20px !important;
    }

    .stat-box-small {
        font-size: 17px;
        display: inline-block;

    }

    .stat-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;

    }
</style>
