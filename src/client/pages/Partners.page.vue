<template>

    <layout>

        <div slot="content">

            <partner-hero/>

        </div>

    </layout>

</template>

<script>

    import Layout from "client/components/layout/sampleLayout.vue"
    import PartnerHero from "client/components/heros/Partners.hero.vue"


    export default {

        name: "partner-page",

        components:{
            "layout": Layout,
            "partner-hero": PartnerHero,

        }

    }

</script>
