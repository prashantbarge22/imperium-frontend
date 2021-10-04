<template>

    <div>

        <loading-spinner class="bountySpinner" v-if="fetchingList" />

        <div v-if="!fetchingList" class="list">

            <div class="listHead listElement youtubeElement">
                <div>No.</div>
                <div class="title">Title</div>
                <div>Views</div>
                <!--<div>Comments</div>-->
                <div>T-Up</div>
                <div>Subscribers</div>
                <div>Score</div>
                <div>Reward WEBD</div>
            </div>

            <a v-for="(element, index) in this.list" :key="'YoutubeRankingListElement '+index"  :href="element.url" rel="noopener" target="_blank" class="listElement youtubeElement">

                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">Position:</span>
                    <div>{{index+1}}</div>
                </div>
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">Title:</span>
                    <div class="title">{{element.network_text.substring(0, 50)}}</div>
                </div>
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">Views:</span>
                    <div>{{numberWithCommas(element.network_views)}}</div>
                </div>
                <!--<div class="mobileTableShow">-->
                    <!--<span class="mobileTableShowTitle">Comments:</span>-->
                    <!--<div>-</div>-->
                <!--</div>-->
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">T-Up:</span>
                    <div>{{element.network_likes}}</div>
                </div>
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">T-Down:</span>
                    <div>{{element.network_subscribers}}</div>
                </div>
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">Score:</span>
                    <div>{{element.score !== undefined ? element.score.toFixed(2) : 'na'}}</div>
                </div>
                <div class="mobileTableShow">
                    <span class="mobileTableShowTitle">Reward WEBD:</span>
                    <div class="score">{{element.reward !== undefined && element.reward !== -1 ? element.reward.toFixed(2) : 'na'}}</div>
                </div>

            </a>

        </div>

    </div>

</template>

<script>

    import LoadingSpinner from "client/components/UI/elements/Loading-Spinner.vue"

    export default{

        components:{ LoadingSpinner },

        props:{
            fetchingList: {default: true},
            list: {default: function (){ return { } }},
        },

        methods:{

            numberWithCommas(x){
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },



        },


    }

</script>
