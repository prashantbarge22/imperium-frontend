<template>

    <div class="balanceExp">

        <h1>Balances</h1>
        <h3 style="text-align: center">Top 2000 Addresses</h3>

        <loading-spinner class="bountySpinner" v-if="this.loaded===false" />

        <div v-if="this.loaded!==false">

            <chart :data="this.chartData" :options="this.chartOptions" class="balanceChart" ></chart>

            <div class="list balancesExplorer">

                <div class="listHead listElement list">
                    <div>No.</div>
                    <div>C</div>
                    <div>Address</div>
                    <div>Balance</div>
                </div>

                <div class="listElement list" v-for="(element, index) in this.removeNullAddresses(this.data)" :key="'balances '+index">
                    <div>{{index}}</div>
                    <div :style="{backgroundColor: Utils.generateRandomcolor(element.address)}"></div>
                    <div class="address">{{element.address}}</div>
                    <div class="title">{{Utils.formatMoneyNumber(element.balance)}}</div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import LoadingSpinner from "client/components/UI/elements/Loading-Spinner.vue";
    import Chart from "client/components/UI/elements/Chart.vue"
    import Utils from 'src/utils/util-functions'
    import WebDollarEmitter from './../../../../../utils/WebDollarEmitter';

    export default{

        components:{ LoadingSpinner, Chart },

        data: () => {
            return {
                data: false,
                loaded: false,
                chartOptions: {},
                chartData: {}
            }
        },

        methods:{

            removeNullAddresses(data){

                var newData =[];

                for (var i=0; i<data.length; i++)
                    if (data[i].balance >= 10000) newData.push(data[i]);

                return newData;

            },

            updateChart(){

                this.chartData= {
                    labels: [],
                    datasets: [
                        {
                            label: 'Balance Distribution',
                            data: [],
                            backgroundColor: [],
                            borderColor: [],
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

                                var balance = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                                var address = data.labels[tooltipItems.index];
                                balance = Utils.formatMoneyNumber(balance);
                                return address + ' - ' + balance+' IDLL';
                            }
                        }
                    }

                };

                for(let i=0; i < this.data.length; i++){

                    if (this.data[i].balance >= 10000) {

                        var color = Utils.generateRandomcolor(this.data[i].address);

                        this.chartData.datasets[0].data.push(this.data[i].balance);
                        this.chartData.labels.push(this.data[i].address);
                        this.chartData.datasets[0].backgroundColor.push(color);
                        this.chartData.datasets[0].borderColor.push(color);

                    }

                }

                this.loaded = true;

            },

            _blockchainStatus(data) {
                if (data.message === "Blockchain Ready to Mine") {
                    this.data = WebDollar.Blockchain.AccountantTree.getAccountantTreeList();
                    this.updateChart();
                }
            }

        },

        computed:{

            Utils(){
                return Utils;
            }

        },

        mounted(){
            const self = this;
            this.$nextTick(() => {
                if (WebDollar.Blockchain.synchronized) {
                    self.data = WebDollar.Blockchain.AccountantTree.getAccountantTreeList();
                    self.updateChart();
                }

                WebDollarEmitter.on('blockchain/status', self._blockchainStatus);
            });
        },
        destroyed() {
            WebDollarEmitter.off('blockchain/status', this._blockchainStatus);
        }
    }

</script>

<style>

    .balanceChart{
        padding: 40px 0 40px 0;
    }

</style>
