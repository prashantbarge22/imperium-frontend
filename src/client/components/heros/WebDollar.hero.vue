<template>
    <div id="mainSection" class="fullSection">
        <div class="verticalAlignMiddle alignCenter modifyTop verticalAlignMiddleMobileFix webSiteVerticalMiddle" @scroll="this.scrollPassByLogo()">

            <img src="/public/assets/images/imperium logo.png" alt="Cryptocurrency of the future" title="Cryptocurrency of the future" id="ImperiumLogo" class="mainLogo fadeIn">

            <h1 class="fadeIn fadeIn2 noTransform titleWebSite">  IMPERIUM </h1>
            <!--<h2 class="fadeIn fadeIn2" :class="this.maintenance ? '' : 'hide'"><b class="testnet">EXPERIMENTAL</b></h2>-->
            <h3 class="fadeIn fadeIn3 mottoWebSite">Currency of the Internet</h3>

            <div>

                <h5 class="fadeIn fadeIn4 statusMining" :class="this.loaded? 'hide' : ''">{{this.status}}</h5>

                <div :class="this.loaded? '' : 'hide'" class='btn-cont btnPosition fadeIn fadeIn2'>
                    <a class='btn' href="#p2p-network" title="Browser mining cryptocurrency real-time network">
                        See your Network
                        <span class='line-1'></span>
                        <span class='line-2'></span>
                        <span class='line-3'></span>
                        <span class='line-4'></span>
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import LoadingSpinner   from '../UI/elements/Loading-Spinner.vue';
    import WebDollarEmitter from '../../../utils/WebDollarEmitter';

    export default {

        name: "WebDollarHero",

        components: {
            LoadingSpinner,
        },

        data: () => {
            return {
                status: 'Starting...',
                loaded: false,
                maintenance: true,
                randomReloader: 10,
                minerPoolName: '',
            }
        },

        mounted() {
            const self = this;
            this.$nextTick(() => {
                //pool
                if (typeof WebDollar.Blockchain.MinerPoolManagement !== 'undefined' && WebDollar.Blockchain.MinerPoolManagement.minerPoolStarted) {
                    self.minerPoolName = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName;
                } else {
                    self.minerPoolName = '';
                }

                if (WebDollar.Blockchain.synchronized) {
                    self.loaded = true;
                    self.status = "Mining Blockchain...";
                }

                WebDollarEmitter.on('miner-pools/status',    self._minerPoolsStatus);
                WebDollarEmitter.on('blockchain/status',     self._blockchainStatus);
                WebDollarEmitter.on('agent/status',          self._agentStatus);
                WebDollarEmitter.on('mining/status-changed', self._miningStatusChanged);

                setInterval(() => {
                    if (WebDollar.Blockchain.Mining.started && WebDollar.Blockchain.Mining._hashesPerSecond === 0) {
                        location.reload();
                    }
                }, 5 * 60 * 1000);
            });
        },

        destroyed() {
            WebDollarEmitter.off('miner-pool/status',     this._minerPoolsStatus);
            WebDollarEmitter.off('blockchain/status',     this._blockchainStatus);
            WebDollarEmitter.off('agent/status',          this._agentStatus);
            WebDollarEmitter.off('mining/status-changed', this._miningStatusChanged);
        },

        methods: {

            _agentStatus(data) {
                if (!this.loaded) {

                    this.status = data.message;

                    if (typeof data.blockHeight !== 'undefined') {
                        this.status = this.status + " " + data.blockHeight;
                    }

                    if (typeof data.blockHeightMax !== 'undefined') {
                        this.status = this.status + " / " + (data.blockHeightMax - 1);
                    }
                }
            },

            _miningStatusChanged(data) {
                if (data === true) {
                    this.status = "Mining Blockchain...";
                }
                else {
                    this.status = "Mining Blockchain has been suspended"
                }
            },

            _blockchainStatus(data) {
                if (data.message === "Blockchain Ready to Mine") {
                    this.loaded = true;
                }

                this.status = data.message;
            },

            _minerPoolsStatus(data) {
                if (data.message === "Miner Pool Started changed" || data.message === "Miner Pool Opened changed" || data.message === "Miner Pool Initialized changed")
                    if (typeof WebDollar.Blockchain.MinerPoolManagement !== 'undefined' && WebDollar.Blockchain.MinerPoolManagement.minerPoolStarted) {
                        this.minerPoolName = WebDollar.Blockchain.MinerPoolManagement.minerPoolSettings.poolName;
                    }
                    else {
                        this.minerPoolName = '';
                    }
            },

            scrollPassByLogo(){

                if (typeof window === "undefined") return;

                let logo       = this.$el.querySelector('#WebDollarLogo');
                let logoHeight = logo.height;

                console.log( logoHeight + this.getPosition(logo).y );
                console.log( window.scrollY )

            },

            getPosition(element) {

                let xPosition = 0;
                let yPosition = 0;

                while (element) {
                    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                    element = element.offsetParent;
                }

                return { x: xPosition, y: yPosition };

            },
        }
    }
</script>
