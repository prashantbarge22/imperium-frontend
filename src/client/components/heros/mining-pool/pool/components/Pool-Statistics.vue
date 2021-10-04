<template>
    <div class="distributionGrid poolDescription">

        <div class="distributionGrid borderBottom">
            <h2 class="subtitle">POOL STATISTICS</h2>
        </div>
        <!-- <span class="oneLineText">
          Your Role: <span class="normalSpan yellowColor"> {{statsType}} </span>
          </span>

          <span class="oneLineText">
          Pool Status: <span class="normalSpan Uppercase" :class="this.selectStatusColor">{{ this.poolStatus }}</span>
          </span>

          <span class="oneLineText">
          Online Hosts: <span class="normalSpan" :class="this.selectOnlineHostColor"> {{ this.onlineHosts }} </span>
          </span>

          <span class="oneLineText">
          Pool Hash: <span class="normalSpan yellowColor"> {{this.getHashrate }} {{this.getHashrateSign}}</span>
          </span>

          <span class="oneLineText">
          Pool Power: <span class="normalSpan yellowColor"> {{this.getPoolPower }}% </span>
          </span>

          <span class="oneLineText">
          Time to next block: <span class="normalSpan" :class="this.isNotNullColor"> {{this.showPoolRemainingTime}} </span>
          </span> -->


        <a :href="this.poolWebsite">
            <div class='stat-box-link'>

                <p class="stat-box-small">Mining in:</p>
                <p class="normalSpan yellowColor"> {{this.poolName}}</p>

            </div>
        </a>

        <div class='stat-box'>

            <p class="stat-box-small">Pool Fee: </p>
            <p class="normalSpan yellowColor" :class="this.isNotNullColor"> {{this.poolFee}}%</a></p>

        </div>

        <div class='stat-box'>

            <p class="stat-box-small">Miners in Pool: </p>
            <p class="normalSpan" :class="this.isNotNullColor"> {{ this.poolMinersOnline}} </p>

        </div>

        <div class='stat-box'>

            <p class="stat-box-small">Blocks Paid: </p>
            <p class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksConfirmedAndPaid}} </p>
            <!--Being confirmed: <span class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksBeingConfirmed}} </span> Unconfirmed <span class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksUnconfirmed}} </span>-->

        </div>

        <div class='stat-box'>

            <p class="stat-box-small">Blocks Pending: </p>
            <p class="normalSpan" :class="this.isNotNullColor"> {{this.poolBlocksConfirmed}} </p>

        </div>

        <div class='stat-box'>
            <div v-if="this.statsType === 'miner'">
                <p class="stat-box-small">Your Ref. Potential Reward: </p>
                <p class="normalSpan" :class="this.isNotNullColor"> {{this.referralPotential}} IDLL</p>
            </div>
        </div>

        <!--<network ref="minerPool" :poolWebsite="poolWebsite"> </network>-->

    </div>
</template>

<script>
    import Vue from 'vue';
    import Utils from 'src/utils/util-functions';
    import WebDollarEmitter from './../../../../../../utils/WebDollarEmitter';
    import Network from "src/client/components/heros/Network.hero.vue"

    export default {

        components: {Network},

        data: () => {
            return {

                poolsList: {},
                poolsListSelected: '',

            };
        },

        props: {

            statsType: {
                default: 'pool'
            },

            poolName: '',
            poolWebsite: '',
            poolURL: '',
            poolFee: 0,
            poolReferralFee: 0,
            poolServers: {},
            poolStatus: '',

            poolHashes: 0,
            poolMinersOnline: 0,
            poolBlocksConfirmed: 0,
            poolBlocksConfirmedAndPaid: 0,
            poolBlocksUnconfirmed: 0,
            poolBlocksBeingConfirmed: 0,
            poolTimeRemaining: 0,
            networkHashRate: 0,

            rewardReferralTotal: 0,
            rewardReferralConfirmed: 0,
        },

        computed: {

            getPoolPower() {
                return Utils.showHashes(parseInt((this.poolHashes / 10) / this.networkHashRate * 100));
            },

            showPoolRemainingTime() {

                if (this.poolTimeRemaining === undefined || this.poolTimeRemaining === -1) return `na`;

                let time = this.poolTimeRemaining * 20;

                let y = Math.floor(time / (12 * 30 * 7 * 24 * 60 * 60));
                time %= (12 * 30 * 7 * 24 * 60 * 60);

                let mo = Math.floor(time / (30 * 7 * 24 * 60 * 60));
                time %= (30 * 7 * 24 * 60 * 60);

                let w = Math.floor(time / (7 * 24 * 60 * 60));
                time %= (7 * 24 * 60 * 60);

                let d = Math.floor(time / (24 * 60 * 60));
                time %= (24 * 60 * 60);

                let h = Math.floor(time / (60 * 60));
                time %= (60 * 60);

                let m = Math.floor(time / (60));
                time %= (60);

                let s = Math.floor(time);

                return (y !== 0 ? ` ${y} y` : ``) + (mo !== 0 ? ` ${mo} mo` : ``) + (w !== 0 ? ` ${w} w` : ``) + (d !== 0 ? ` ${d} d` : ``) + (h !== 0 ? ` ${h} h` : ``) + (m !== 0 ? ` ${m} m` : ``) + (s !== 0 ? ` ${s} s` : ``);
            },

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

            selectStatusColor() {

                if (this.poolStatus === 'Started') return 'greenColor';
                if (this.poolStatus === 'Configured') return 'redColor';

                return 'yellowColor';

            },

            selectOnlineHostColor() {

                if (this.numberOfConnectedHosts === 0) return 'redColor';

                if (Object.keys(this.poolServers).length === this.numberOfConnectedHosts) return 'greenColor';

                return 'yellowColor';

            },

            onlineHosts() {

                let onlineServersNumber = this.numberOfConnectedHosts;

                if (onlineServersNumber === 0) return 'Offline';

                return onlineServersNumber + ' / ' + Object.keys(this.poolServers).length;

            },


            getHashrate() {
                return Utils.showHashes(this.poolHashes / 10);
            },

            getHashrateSign() {
                return Utils.showHashesSign(this.poolHashes / 10);
            },

            referralPotential() {

                if (typeof window === 'undefined') return 0;

                window.addEventListener('load', () => {
                    return this.rewardReferralTotal / WebDollar.Applications.CoinsHelper.WEBD;
                });
            }

        },

        methods: {

            handlePoolSelect() {

                let poolName = this.poolsListSelected;
                let value;

                if (poolName === 'Pool Mining Disabled') {
                    value = false;
                } else {

                    for (let key in this.poolsList) {
                        if (this.poolsList[key].poolName === poolName) {
                            value = this.poolsList[key].poolURL;
                            break;
                        }
                    }

                }

                WebDollar.Blockchain.MinerPoolManagement.startMinerPool(value, true);

            },

            setPoolsList(list) {
                this.poolsList = list;
            },


            loadPoolData() {

                if (WebDollar.Blockchain.MinerPoolManagement === undefined) {

                } else {

                    let poolsList = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolsList;

                    this.poolsList = {};
                    for (let key in poolsList) {

                        let index = 0;
                        for (let alreadyKey in this.poolsList) {
                            if (this.poolsList[alreadyKey].poolName === poolsList[key].poolName + (index > 0 ? ` (${index})` : '')) {
                                index++;
                                break;
                            }
                        }

                        Vue.set(this.poolsList, key, poolsList[key]);

                        this.poolsList[key].poolName = this.poolsList[key].poolName + (index > 0 ? ` (${index})` : '');

                    }

                    let minerPoolFound = false;

                    if (WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.minerPoolActivated) {

                        let minerPoolPublicKey = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolPublicKey.toString('hex');

                        for (let poolPublicKey in poolsList) {
                            if (poolPublicKey === minerPoolPublicKey) {
                                this.poolsListSelected = poolsList[poolPublicKey].poolName;
                                minerPoolFound = true;
                                break;
                            }
                        }


                    }

                    if (!minerPoolFound) {
                        this.poolsListSelected = 'Pool Mining Disabled';
                    }

                }


            },

        },

        mounted() {
            const self = this;
            this.$nextTick(() => {
                WebDollarEmitter.on('miner-pool/settings', self.loadPoolData);
                self.loadPoolData();
            });
        },
        destroyed() {
            WebDollarEmitter.off('miner-pool/settings', this.loadPoolData);
        }
    };
</script>

<style>
    .poolSelectOption {

        background-color: #8d8d8d;

    }

    .stat-box,
    .stat-box-link {

        height: auto;
        width: auto;
        padding: 10px 30px 10px 30px;
        margin-top: 10px;
        margin-bottom: 4px;
        display: block;
        font-weight: 50 !important;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        letter-spacing: 2px;
        color: #ffffff;
        line-height: 40px;
        border: 5px solid;
        border-color: #1b1b1b;
        border-radius: 20px;
        text-align: left
    }

    .stat-box > span {
        color: #ffffff;
    }

    .stat-box-link:hover {
        cursor: pointer;
        color: #fec02c;
        border-color: #1b1b1b;
        background-color: #1b1b1b;
        -webkit-transition: background-color .3s ease-out;
        -moz-transition: background-color .3s ease-out;
        -o-transition: background-color .3s ease-out;
        transition: background-color .3s ease-out;
    }
</style>
