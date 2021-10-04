<template>

    <div>

        <h2>Pool Dashboard</h2>

        <div class="selectedMinerInfo">

            <span class="minerData address addressTextBox">{{this.pool.address}}</span>

            <div class="statisticsContent">

                <div class="dataStatisticsItem" title="All your miners estimated hash rate">
                    <span class="titlePool">Pool Hash/s:</span>
                    <span class="minerData">{{this.pool.hashs}}</span>
                </div>

                <div class="dataStatisticsItem">
                    <span class="titlePool" title="Your reward at next block mined by pool">NB Reward:</span>
                    <span class="minerData">{{this.pool.hashrate}} IDLL</span>
                </div>

                <div class="dataStatisticsItem">
                    <span class="titlePool" title="All yours miners reward at next block mined by your pool">NB Miner Reward:</span>
                    <span class="minerData">{{this.pool.NextBlockMinerReward}} IDLL</span>
                </div>

                <div class="dataStatisticsItem">
                    <span class="titlePool" title="All your servers reward at next block mined by your pool">NB Servers Reward:</span>
                    <span class="minerData">{{this.pool.NextBlockServerReward}} IDLL</span>
                </div>

                <div class="dataStatisticsItem" title="Aproximed time to wait until your pool will mine the next block">
                    <span class="titlePool">NB Mining Time:</span>
                    <span class="minerData">{{this.pool.hashs}} IDLL</span>
                </div>

                <!--                <div class="dataStatisticsItem">
                    <span class="titlePool">Initialized</span>
                    <span class="minerData">{{this.initialized ? 'activated' : 'deactivated'}}</span>
                </div>-->

                <div class="dataStatisticsItem">
                    <span class="titlePool">Open</span>
                    <span class="minerData">{{this.open ? 'activated' : 'deactivated'}} </span>
                </div>

                <div class="dataStatisticsItem">
                    <span class="titlePool">Started</span>
                    <span class="minerData">{{this.started ? 'activated' : 'deactivated'}} </span>
                </div>
                <div class="dataStatisticsItem" v-for="(poolServer, index) in this.poolServers">
                    <span class="titlePool">{{poolServer.name}}</span>
                    <span class="minerData">{{poolServer.connected ? 'established' : 'not established'}} </span>
                </div>


            </div>

        </div>

    </div>

</template>

<script>

    import WebDollarEmitter from "../../../../../../utils/WebDollarEmitter";

    export default{

        props: {
            pool: {default: 'list'},
        },

        data:()=>{
            return {
                initialized: false,
                open: false,
                started: false,
                poolServers: {},
            }
        },

        mounted(){
            const self = this;

            this.$nextTick(() => {
                WebDollar.Blockchain.onLoaded.then((answer)=>{
                    self.loaded = true;
                    self.loadData();
                });

                WebDollarEmitter.on('pools/status',   self._poolsStatus);
                WebDollarEmitter.on('pools/settings', self._poolsSettings);
            });
        },

        destroyed() {
            WebDollarEmitter.off('pools/status',   this._poolsStatus);
            WebDollarEmitter.off('pools/settings', this._poolsSettings);
        },

        methods: {

            loadData() {

                this.initialized = WebDollar.Blockchain.PoolManagement.poolInitialized;
                this.open = WebDollar.Blockchain.PoolManagement.poolOpened;
                this.started = WebDollar.Blockchain.PoolManagement.poolStarted;
                this.getPoolServers();

            },

            getPoolServers(poolServers){

                if (typeof poolServers === 'undefined')
                    poolServers = WebDollar.Blockchain.PoolManagement.poolSettings.poolServers;

                this.poolServers = WebDollar.Applications.PoolsUtilsHelper.getPoolServersStatus(poolServers);

            },

            _poolsStatus(data) {
                switch (data.message) {
                    case "Pool Initialization changed":
                        this.initialized = data.result;
                        break;

                    case "Pool Opened changed":
                        this.open = data.result;
                        break;

                    case "Pool Started changed":
                        this.started = data.result;
                        break;
                }
            },

            _poolsSettings(data) {
                if (data.message === "Pool Settings were saved") {
                    this.getPoolServers( data.poolServers );
                }
            }
        },

    }

</script>

<style>

    .addressTextBox{
        background-color: #505050;
        width: 100%;
        text-align: center;
    }

    .dataStatisticsItem{
        display: grid;
        border-top:solid 1px #3e3e3e;
        grid-template-columns: 150px 1fr;
    }

    .dataStatisticsItem:last-child{
        border-bottom:solid 1px #3e3e3e;
    }

    .dataStatisticsItem span{
        width: 100%;
    }

    .dataStatisticsItem .minerData{
        text-align: right;
    }

    .statisticsContent{
        display: block;
        padding: 20px 10px 0 10px;
        overflow-y: scroll;
    }

</style>
