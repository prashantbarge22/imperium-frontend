<template>
<div>

  <div class="infoBounty" :class="this.showSubscription ? 'infoBountyPlus' : ''">

    <div class="countDown">
      <div class="verticalAlignMiddle">
        <span class="countDownTitle">{{this.type}} bounty end:</span>

        <!--<countdown :deadline="this.info.deadline" ></countdown>-->


        <ul class="vuejs-countdown" v-if="this.message === ''">
          <li>
            <p class="digit">{{d}}</p>
            <p class="text">days</p>
          </li>
          <li>
            <p class="digit">{{h}}</p>
            <p class="text">hours</p>
          </li>
          <li>
            <p class="digit">{{m}}</p>
            <p class="text">min</p>
          </li>
          <li>
            <p class="digit">{{s}}</p>
            <p class="text">Sec</p>
          </li>
        </ul>

        <span class="finishedCount" v-if="this.message !== ''">
          {{message}}
        </span>

      </div>
    </div>

    <div class="campaignInfo">
      <span class="infoLine">
        <b>Bounty round:</b>
        <div style="display: inline-block">
          <select id="poolConnectionSelect" class="poolSelect" @change="handleChange($event)">
            <option v-bind="(elem, index) in this[this.type].bounties" class="poolSelectOption">
              {{elem.name}}
            </option>
          </select>
        </div>
      </span>
      <span class="infoLine">
        <b>Bounty registration:</b> {{ this.info.registration }}
      </span>
      <span class="infoLine">
        <b>Conditions of participation:</b> {{ this.info.conditions }}
      </span>
      <span class="infoLine">
        <b>Scoring formula:</b> {{this.info.formula}}
      </span>
      <span class="infoLine">
        <b>List updated:</b> Every hour
        <!--
                <div v-if="this.info.update == ''">
                    <b>Next list update:</b> {{this.refreshCountDownSeconds + ' seconds left'}}
                </div>
                <div v-if="this.info.update != ''">
                    <b>Next list update:</b> {{this.info.update}}
                </div>
                -->
      </span>
      <span class="infoLine">
        <b>Obtain the reward:</b> {{this.info.description}}
      </span>
      <span class="infoLine">
        <b class="capitalize">{{this.type}} bounty Amount:</b> {{this.info.amount}} WEBD
      </span>

    </div>

    <submit-link class="submitLink" v-if="this.showSubscription" :type="this.type" @onLinkSubmitted="this.onLinkSubmitted"> </submit-link>

  </div>
  <div v-cloak>
    <span class="bountyAuditWarning">
      <b> {{bountyAccountAuditFirst}}</b><br><b> {{bountyAccountAuditSecond}}</b>
    </span>
  </div>
</div>
</template>

<script>
import consts from "consts/constants"
import SubmitLink from "./Submit-Link.form.vue";
import countdown from "client/components/UI/elements/Countdown.component.vue"

let axios = require('axios');

export default {

  components: {
    countdown,
    SubmitLink
  },

  data: () => {

    let commonDeadline = 'April 2, 2018 00:00';

    return {

      refreshCountDownSeconds: 0,

      bountyAccountAuditFirst: "WebDollar team will periodically audit accounts that look suspicious of having fake followers, likes or shares.",
      bountyAccountAuditSecond: "Any account not passing the audit will be banned from the bounty programme.",

      youtube: {
        registration: "Automatic",
        conditions: 'Include "#webdollar #bounty #reward" in description and "WebDollar in title',
        formula: "Views/10 * ( ThumbsUp / ThumbsDown*5 )/500",
        update: "",
        description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address. Insert in the last post your address in order to set or update an address.",
        amount: "10.000",
        end_date: commonDeadline,
      },
      twitter: {
        registration: "Automatic",
        conditions: 'Include "#webdollar #bounty #reward" in post',
        formula: "(Likes + Retweets*4)/10",
        update: "",
        description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address. Insert in the last post your address in order to set or update an address.",
        amount: "15.000",
        end_date: commonDeadline,
      },
      // facebook:{
      //     registration: "Register post link",
      //     conditions: 'Include WebDollar in the content',
      //     formula: " (Likes + 3*shares + 1.5*comments)/30",
      //     update: "",
      //     description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address",
      //     amount: "10.000",
      //     end_date: commonDeadline,
      // },
      // instagram:{
      //     registration: "Automatic",
      //     conditions: 'Include #WebDollar in post',
      //     formula: " (Likes + 2*comments)/10",
      //     update: "",
      //     description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address",
      //     amount: "5.000",
      //     end_date: commonDeadline,
      // },
      // telegram:{
      //     registration: "Automatic",
      //     conditions: 'Be a member in the group, promote meaningful conversations and invite people (maximum 2 at a time)',
      //     formula: " (Messages/100 + Invitations) ",
      //     update: "Every day",
      //     description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address",
      //     amount: "20.000",
      //     end_date: commonDeadline,
      // },
      // reddit:{
      //     registration: "Automatic",
      //     conditions: 'Discus on the /r/WebDollar subreddit',
      //     formula: " (RedditScore*2 + comments)/10 ",
      //     update: "",
      //     description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address",
      //     amount: "10.000",
      //     end_date: commonDeadline,
      // },
      // website:{
      //     registration: "Automatic",
      //     conditions: 'Discus on the WebDollar in Title and Description',
      //     formula: " Google PageRank + Score*2 ",
      //     update: "",
      //     description: "At the end of the bounty campaign period, within 5 days all rewards will be sent to the attached wallet address",
      //     amount: "1.000",
      //     end_date: commonDeadline,
      // },

      interval: undefined,

      d: 0,
      h: 0,
      m: 0,
      s: 0,
      message: '',

    }
  },

  computed: {

    info() {

      let answer;
      if (this.type !== '')
        answer = this[this.type];

      if (answer === undefined)
        answer = this.youtube;

      return answer;
    },

    showSubscription() {

      if (this.type !== 'reddit' && this.type !== 'instagram' && this.type !== 'telegram' && this.type !== 'telegram RO' && this.type !== 'twitter' && this.type !== 'youtube')
        return true;

      return false;

    },

  },

  props: {
    type: {
      default: ''
    },
    onLinkSubmitted: {
      default: () => {}
    },
    end_date: {
      default: "Sep 5, 2018 15:37:25"
    },
  },

  methods: {
    handleChange(event) {
      let index = 0;
      let selected = event.target.value;
      let bounties = this[this.type].bounties;

      for (var i=0; i<bounties.length; i++) {
        if (bounties[i].name === selected) {
          index = i;
          break;
        }
      }

      this[this.type] = bounties[index];
      this[this.type].bounties = bounties;
      this[this.type].update = '';

      this.$emit('bountySelected', bounties[index]);
    },

    countDown() {

      let countDownDate = new Date(this.info.end_date).getTime();

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.d = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.s = Math.floor((distance % (1000 * 60)) / 1000);

      // Estetic redefine
      if (this.h < 10)
        this.h = '0' + this.h;

      if (this.d < 10)
        this.d = '0' + this.d;

      if (this.m < 10)
        this.m = '0' + this.m;

      if (this.s < 10)
        this.s = '0' + this.s;

      // If the count down is finished, write some text
      if (distance < 0) {
        this.message = 'FINISHED';
      } else {
        this.message = '';
      }

    }


  },

  async mounted() {

    if (typeof window === "undefined") return false;

    let twitter_call = await axios.get(consts.SERVER_API + "bounties?network=twitter");

    if (twitter_call.data.length > 0) {
      // Get last bounty
      let bounty = twitter_call.data[twitter_call.data.length - 1];
      this.twitter = bounty;
      this.twitter.bounties = twitter_call.data.reverse();
      this.twitter.update = '';

      this.$emit('bountySelected', bounty);
    }

    let youtube_call = await axios.get(consts.SERVER_API + "bounties?network=youtube");

    if (youtube_call.data.length > 0) {
      // Get last bounty
      let bounty = youtube_call.data[youtube_call.data.length - 1];
      this.youtube = bounty;
      this.youtube.bounties = youtube_call.data.reverse();
      this.youtube.update = '';

      this.$emit('bountySelected', bounty);
    }

    setInterval(() => {

      // Get todays date and time
      let now = new Date().getTime();
      // Find the distance between now an the count down date
      let distance = this.$store.state.global.bountyCountDownDateFetchingNewList - now;

      this.refreshCountDownSeconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    }, 1000);


    // Update the count down every 1 second
    if (this.interval !== undefined)
      clearInterval(this.interval);

    this.interval = setInterval(this.countDown, 1000);

    this.countDown();


  }


}
</script>

<style>
.error {
  color: red
}
</style>
