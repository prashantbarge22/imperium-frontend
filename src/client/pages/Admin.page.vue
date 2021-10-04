<template>

    <div>

        <Layout v-show="!protocolUsedOnMultipleTabs">

            <div slot="content">

                <admin-panel/>

            </div>

        </Layout>

        <multiple-tabs v-show="protocolUsedOnMultipleTabs"/>

    </div>

</template>

<script>

    import Layout from "../components/layout/Layout.vue"
    import AdminPanel from "../components/heros/mining-pool/Admin.Panel.vue"
    import MultipleTabs from "../components/heros/Multiple-Tabs.hero.vue";
    import WebDollarEmitter from "../../utils/WebDollarEmitter";

    export default {

        name: "admin-page",

        components:{
            Layout,
            AdminPanel,
            MultipleTabs,
        },

        data: ()=> {
            return {
                protocolUsedOnMultipleTabs: false,
            }
        },

        methods: {
            _blockchainStatus(data) {
                if (data.message === "Single Window") {
                    this.protocolUsedOnMultipleTabs = false;
                } else if (data.message === "Multiple Windows Detected") {
                    this.protocolUsedOnMultipleTabs = true;
                }
            }
        },

        mounted() {
            const self = this;

            this.$nextTick(() => {
                WebDollarEmitter.on('blockchain/status', self._blockchainStatus);
            });
        },

        destroyed() {
            WebDollarEmitter.off('blockchain/status', this._blockchainStatus);
        }

    }

</script>
