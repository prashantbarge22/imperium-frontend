<template>

    <div >

        <a id="newsletter"> </a>
        <div id="newsletterSection" class="backgroundSection">

            <span class="pageTitle alignCenter titleMarginBottom removeBackground">Follow us</span>

            <div class="socialLinksNewsletter">
                <a href="https://facebook.com/webdollar.io" rel="noopener" target="_blank" class="linkIconSocial">
                    <img data-src="/public/assets/images/SocialMedia/facebook_white.png" alt="Facebook CryptoCurrency WebDollar" title="Facebook CryptoCurrency WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/facebook_yellow.png" alt="Facebook CryptoCurrency WebDollar" title="Facebook CryptoCurrency WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://twitter.com/webdollar_io" rel="noopener" target="_blank" class="linkIconSocial">
                    <img data-src="/public/assets/images/SocialMedia/twitter_white.png" alt="Twitter WebDollar" title="Twitter WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/twitter_yellow.png" alt="Twitter WebDollar" title="Twitter WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://t.me/WebDollar" rel="noopener" target="_blank" class="linkIconSocial">
                    <img data-src="/public/assets/images/SocialMedia/telegram_white.png" alt="Telegram WebDollar" title="Telegram WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/telegram_yellow.png" alt="Telegram WebDollar" title="Telegram WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://github.com/WebDollar" rel="noopener" target="_blank" class="linkIconSocial">
                    <img data-src="/public/assets/images/SocialMedia/github_white.png" alt="Github CryptoCurrency WebDollar" title="Github CryptoCurrency WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/github_yellow.png" alt="Github CryptoCurrency WebDollar" title="Github CryptoCurrency WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://www.reddit.com/r/webdollar/" rel="noopener" target="_blank"  class="linkIconSocial lazy">
                    <img data-src="/public/assets/images/SocialMedia/reddit_white.png" alt="Reddit WebDollar" title="Reddit WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/reddit_yellow.png" alt="Reddit WebDollar" title="Reddit WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://medium.com/@webdollar" rel="noopener" target="_blank" class="linkIconSocial">
                    <img data-src="/public/assets/images/SocialMedia/medium_white.png" alt="Medium WebDollar" title="Medium WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/medium_yellow.png" alt="Medium WebDollar" title="Medium WebDollar" class="linkIconSocialHover lazy">
                </a>
                <a href="https://shang.qq.com/wpa/qunwpa?idkey=7021906277b183cdedb6567ea96d2170cef9b24b8bba09807570b0b5bf04da43" rel="noopener" target="_blank" class="linkIconSocial">
					<img data-src="/public/assets/images/SocialMedia/qq_white.png" alt="QQ WebDollar" title="QQ WebDollar" class="linkIconSocialNormal lazy">
                    <img data-src="/public/assets/images/SocialMedia/qq_yellow.png" alt="QQ WebDollar" title="QQ WebDollar" class="linkIconSocialHover lazy">
                </a>
            </div>

            <div id="newsletterContainer">

                <label for="newsletterInput">
                    <span class="newsletterText">Subscribe to our newsletter for the latest news</span>
                </label>

                <div v-if="this.success === ''" >
                    <input v-model="email" placeholder="Email" id="newsletterInput" />

                    <span class="error">
                        {{this.error}}
                    </span>

                    <span class="websiteButton" @click="subscribeEmail">Subscribe</span>
                </div>

                <div class="success" v-if="this.success !== ''">
                    {{this.success}}
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    const axios = require('axios');
    import consts from "consts/constants";

    export default{

        data:()=>{
            return {
                email: '',
                error:'',
                success: '',
            }
        },

        methods:{

            async subscribeEmail(){

                let answer;
                try {
                    answer = await axios.post(consts.SERVER_API + "subscribe-newsletter", {email: this.email});
                } catch (exception){

                    this.error = "There is a problem subscribing to newsletter";
                    return false;

                }

                answer = answer.data;

                if (answer.result === false){
                    this.error = answer.message;
                    this.success = '';
                } else {
                    this.error = '';
                    this.success = answer.message;
                }

            }

        }

    }

</script>

<style>

    .socialLinksNewsletter{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        max-width: 500px;
        margin: 0 auto;
        margin-bottom: 50px;
        padding: 20px;
    }

    .linkIconSocial img{
        width: 40px;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }

    .linkIconSocial .linkIconSocialHover{
        display: none;
    }

    .linkIconSocial:hover .linkIconSocialHover{
        display: block;
    }

    .linkIconSocial:hover .linkIconSocialNormal{
        display: none;
    }

    #newsletterContainer input{
        transition: all 0.5s ease;
    }

    #newsletterContainer input:focus{
        border: solid 1px #8c8c8c;
        background-color: rgb(32, 178, 117);
        transition: all 0.5s ease;
    }

</style>