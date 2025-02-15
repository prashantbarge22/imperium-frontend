<template>

    <div class="balanceExp">

        <h1>Last {{this.data.length}} Mined Blocks</h1>

        <loading-spinner class="bountySpinner" v-if="this.data===false" />

        <div v-if="this.data!==false">

            <chart :data="this.chartData" :options="this.chartOptions" ref="refBlocksChart" class="balanceChart" ></chart>

            <div class="list balancesExplorer blocksExplorer">

                <div class="listHead listElement list">
                    <div>No.</div>
                    <div>C</div>
                    <div>Transactions</div>
                    <div>Rewarded Address</div>
                    <div>Reward</div>
                </div>

                <div v-for="(element, index) in this.data" :key="'balances '+index">

                    <div class="listElement list" @click="()=>{showTransactions(element.height)}">

                        <div>{{element.height}}</div>
                        <div :style="{backgroundColor: Utils.generateRandomcolor(element.address)}"></div>
                        <div>{{element.transactions!==[] ? element.transactions.length : 0}}</div>
                        <div class="address">{{element.address}}</div>
                        <div class="title">{{Utils.formatMoneyNumber(element.reward)}}</div>

                    </div>

                    <transactions :ref="'block'+element.height" :data="element.transactions"> </transactions>

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import LoadingSpinner from "client/components/UI/elements/Loading-Spinner.vue";
    import Chart from "client/components/UI/elements/Chart.vue"
    import Utils from 'src/utils/util-functions'
    import Transactions from './Transactions.vue'
    import WebDollarEmitter from "../../../../../utils/WebDollarEmitter";

    export default{

        components:{ LoadingSpinner, Chart, Transactions },

        data: () => {
            return {
                data: false,
                loaded: false,
                chartData: {},
                chartOptions: {}
            }
        },

        methods:{

            showTransactions(height){

                this.$refs['block'+height][0].showForm();

            },

            updateChart(blocks, start,stop){

                let newData = [];

                for (let i=stop-1; i>=start; i--){

                    let newElement = blocks[i];

                    newData.push({
                        height: newElement.height,
                        address: WebDollar.Applications.BufferExtended.toBase(WebDollar.Applications.AddressHelper.generateAddressWIF( newElement.data.minerAddress)),
                        reward: newElement.reward + newElement.data.transactions.calculateFees() ,
                        transactions: WebDollar.Blockchain.blockchain.blocks[newElement.height].data.transactions.transactions
                    });

                }

                return newData;

            },

            addNewBlock(block){

                let founded = false;

                for (let i =0 ;i<this.data.length;i++){

                    if (this.data[i].height === block.height)
                        founded=true;

                }

                if (!founded){

                    this.data.push({
                        height: block.height,
                        address: WebDollar.Applications.BufferExtended.toBase(WebDollar.Applications.AddressHelper.generateAddressWIF( block.data.minerAddress)),
                        reward: block.reward + block.data.transactions.calculateFees() ,
                        transactions: WebDollar.Blockchain.blockchain.blocks[block.height].data.transactions.transactions
                    });

                    this.data.sort(function(a,b) {return (a.height < b.height) ? 1 : ((b.height < a.height) ? -1 : 0);} );

                    this.createChardData(this.data);

                }

            },

            mergeDuplicates(blocks){

                let newData=[];

                for (let i=0; i<blocks.length; i++){

                    let found = null;
                    let foundPosition = null;

                    for (let j= 0;j<newData.length;j++){
                        if(blocks[i].address === newData[j].address){
                            found = newData[j];
                            foundPosition=j;
                            break;
                        }
                    }

                    if (found === null)
                        newData.push({
                            height: blocks[i].height,
                            address: blocks[i].address,
                            reward: blocks[i].reward,
                            transactions: blocks[i].transactions
                        });

                    else {
                        newData[foundPosition].reward += blocks[i].reward;
                    }

                }

                return newData;

            },

            createChardData(){

                let chartData = this.mergeDuplicates(this.data);

                chartData.sort(function(a,b) {return (a.reward > b.reward) ? 1 : ((b.reward > a.reward) ? -1 : 0);} );

                this.chartData= {
                    labels: [],
                    datasets: [
                        {
                            label: 'Balance Distribution',
                            data: [],
                            backgroundColor: [],
                            borderColor: [],
                            borderWidth:2
                        }
                    ],
                };

                this.chartOptions = {

                    responsive: true,
                    maintainAspectRatio: false,

                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItems, data) => {

                                let balance = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                                let address = data.labels[tooltipItems.index];
                                balance = Utils.formatMoneyNumber(balance);
                                return address + ' - ' + balance+' IDLL';
                            }
                        }
                    }

                };

                for(let i=0;i<chartData.length; i++){

                    let color = Utils.generateRandomcolor(chartData[i].address);

                    this.chartData.datasets[0].data.push(chartData[i].reward);
                    this.chartData.labels.push(chartData[i].address);
                    this.chartData.datasets[0].backgroundColor.push(color);
                    this.chartData.datasets[0].borderColor.push('#fff');

                }



//                if (this.$refs['refBlocksChart']!==undefined)
//                    this.$refs['refBlocksChart'].rerender();

                this.loaded = true;

            },

            _blockchainBlocksCountChanged(blocksLength) {
                this.addNewBlock(WebDollar.Blockchain.blockchain.blocks[blocksLength - 1]);
            },

            _blockchainStatus(data) {
                if (data.message === "Blockchain Ready to Mine") {

                    let start  = WebDollar.Blockchain.blockchain.blocks.blocksStartingPoint;
                    let stop   = WebDollar.Blockchain.blockchain.blocks.length;
                    let blocks = WebDollar.Blockchain.blockchain.blocks;
                    this.data  = this.updateChart(blocks, start, stop);

                    this.createChardData(self.data);
                }
            }
        },

        computed:{

            Utils(){
                return Utils;
            }

        },

        mounted() {
            const self = this;
            this.$nextTick(() => {
                if (WebDollar.Blockchain.synchronized) {

                    let start  = WebDollar.Blockchain.blockchain.blocks.blocksStartingPoint;
                    let stop   = WebDollar.Blockchain.blockchain.blocks.length;
                    let blocks = WebDollar.Blockchain.blockchain.blocks;
                    self.data  = self.updateChart(blocks, start, stop);
                    self.createChardData(this.data);

                }

                WebDollarEmitter.on("blockchain/status",               self._blockchainStatus);
                WebDollarEmitter.on("blockchain/blocks-count-changed", self._blockchainBlocksCountChanged);
            });
        },

        destroyed() {
            WebDollarEmitter.off('blockchain/status',               this._blockchainStatus);
            WebDollarEmitter.off('blockchain/blocks-count-changed', this._blockchainBlocksCountChanged);
        }
    }

</script>

<style>

    .balanceChart{
        padding: 40px 0 40px 0;
    }

</style>
