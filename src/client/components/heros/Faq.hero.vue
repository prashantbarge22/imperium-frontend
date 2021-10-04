<template>

    <div id="faqSection">

        <span class="alignCenter bigMarginTop pageTitle">Cryptocurrency explained</span>

        <div class="faqContainer sectionCenteredWidth">

            <div class="faqSection">

                <collapse-faq :selected="false" ref="WhatIsImperium">
                    <div slot="collapse-header">
                        What is Imperium?
                    </div>
                    <div slot="collapse-body">
                        Imperium is a browser based digital currency. The main advantages to it, are that Imperium can be mined in your browser and you can transfer funds by storing the wallets locally, without using third parties.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatsItLikeUsingImperium">
                    <div slot="collapse-header">
                        What's it like using Imperium?
                    </div>
                    <div slot="collapse-body">
                        Imperium is a peer to peer (p2p) currency which is native to the internet. The Imperium protocol and blockchain were designed to be light and to work without the installation of any additional software or plugins for wallets or mining. A mini-blockchain is downloaded directly into your browser, while your wallet is securely stored and encrypted directly into your computer. Full consensus is achieved in a matter of seconds by using a novel PPoW - Proofs of Proof of Work algorithm to allow light nodes to check the balance and validate transactions in a matter of seconds. Being native to the internet, Imperium is enabling miners to start mining with a click of a button.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatsValueOfImperiumInFiatCurrency">
                    <div slot="collapse-header">
                        What’s the value of Imperium in FIAT (conventional) currency?
                    </div>
                    <div slot="collapse-body">
                        The value is based on the demand and supply imposed by the market. The price was and is currently set by the market.                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatAreRisksOfMiningImperiumInBrowser">
                    <div slot="collapse-header">
                        What are the risks of mining Imperium in my browser?
                    </div>
                    <div slot="collapse-body">
                        There is no risk involved in using Imperium, but you can expect some latency on your browser, especially if you increase the number of threads used. We recommend using the level 1 thread while you are working on your PC, and increase it when you are away. Likewise, the battery of your device will drain faster and on POW rounds your electricity consumption will slightly increase according to the number of threads that you are using.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HowIsImperiumDifferent">
                    <div slot="collapse-header">
                        How is Imperium different, when compared to other cryptocurrencies?
                    </div>
                    <div slot="collapse-body">
                        Imperium is the easiest and fastest way to use cryptocurrencies. You don’t need technical knowledge or dedicated hardware resources. Imperium aims to make mining available for every laptop and smartphone, which is why we migrated to a hybrid POS 90% (Proof Of Stake) and POW 10% (Proof Of Work) system where is more important the amount you keep at stake, instead of the power your hardware has. POW is then using the Argon2d algorithm which makes mining with special hardware unprofitable because it is ASIC resistant and GPU unfriendly. We want to give everyone the opportunity to mine and take part in the new world of cryptocurrency.                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhereAreTheWalletsStored">
                    <div slot="collapse-header">
                        Where are the wallets stored?
                    </div>
                    <div slot="collapse-body">
                        The Wallets are stored and managed securely by the Browser, by using the Indexed DB API. The wallet's storage location varies from one browser to another. You can also download the wallet as a file and store it on another browser, disk drive, USB drive, cloud storage, cold storage, etc.                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="SupportSmartContracts">
                    <div slot="collapse-header">
                        Does Imperium support smart contracts?
                    </div>
                    <div slot="collapse-body">
                        In the near future Imperium will incorporate a native smart contract system.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="MyBalanceSwitchedToZero">
                    <div slot="collapse-header">
                        Why did my balance switched to 0?
                    </div>
                    <div slot="collapse-body">
                        If you had no available balance before, this may be caused by the fact that you were connected to another pool and the potential balance from the previous pool is not displayed anymore. You will still receive the IDLL mined in the previous pool.                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatIsPotentialBalance">
                    <div slot="collapse-header">
                        What is potential balance?
                    </div>
                    <div slot="collapse-body">
                        The potential balance is the approximation of your total balance at the next payout by the pool. This can vary greatly, because it's the proportion between your involved processing power and the total processing power of the network (which too, will vary).
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="PoolMiningLinkChangeForTerminalMiners">
                    <div slot="collapse-header">
                        Will the link to pool mining change for terminal miners ?
                    </div>
                    <div slot="collapse-body">
                        It depends from one pool to another. However, it is not profitable for a pool to change their link.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatIsPercentageForHybridMiningPoSAndPoW">
                    <div slot="collapse-header">
                        What's the percentage for hybrid mining PoS + PoW ?
                    </div>
                    <div slot="collapse-body">
                        Imperium's mining percentage is split between 90% PoS rounds and 10% PoW rounds.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatIsPoW">
                    <div slot="collapse-header">
                        What is PoW ?
                    </div>
                    <div slot="collapse-body">
                        Proof of Work is the way to mine new coins using your computer's CPU power. The more powerful and numerous your mining computers are, the more Imperiums you earn.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HowWillPoSWorkOnConsensus">
                    <div slot="collapse-header">
                        How will PoS work on consensus ?
                    </div>
                    <div slot="collapse-body">
                        Proof of Stake rounds will work both for pool mining and consensus in browser and terminals.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="MineInPoSFromScratchOrBuyInOrderToStake">
                    <div slot="collapse-header">
                        Can I mine in PoS rounds from scratch or do I need to buy in order to stake?
                    </div>
                    <div slot="collapse-body">
                        If you're mining from scratch you won't be able to earn coins. You need to have an amount of Imperium (100 IDLL) first to stake with, in the PoS rounds.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="IsImperiumAToken">
                    <div slot="collapse-header">
                        Is Imperium a token?
                    </div>
                    <div slot="collapse-body">
                        Imperium is not a token. Imperium is working on its proprietary technology. EDUCATIONAL MOMENT: Unfortunately, cryptocurrency investors do tend to invest in tokens that have absolutely no backing other than a conceptual description. Over time, cryptocurrency investors unaware of this fact, have been investing huge amounts of money into these type of projects that have proven nothing else but good marketing skills. And therefore, the lack of technical developing skills of the teams behind those projects has lead to a dramatic price drop of the said coins or tokens which, in turn has left the investors high and dry, aka without their hard earned investment money.

                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="CompatibleBrowsers">
                    <div slot="collapse-header">
                        Which browsers are compatible with Imperium?
                    </div>
                    <div slot="collapse-body">
                        Chrome, Firefox, Opera, Edge and others.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="DoesItWorkOnIphoneIos">
                    <div slot="collapse-header">
                        Does it work on Iphone (iOS)?
                    </div>
                    <div slot="collapse-body">
                        Yes, it is working on IOS browser, but for the moment only in incognito mode. We also have an app for IOS, but it is not yet possible to add it on the store because the Apple politics regarding cryptocurrencies.
                    </div>
                </collapse-faq>

            </div>

            <div class="faqSection">

                <collapse-faq :selected="false" ref="HowAreWEBDsCreated">
                    <div slot="collapse-header">
                        How are IDLL's created?
                    </div>
                    <div slot="collapse-body">
                        The coins are created by mathematical algorithms using a hybrid mining process. The mining program is using your computer's CPU resources in POW (Proof Of Work) rounds and staking your already mined coins in POS (Proof Of Stake) hybrid rounds.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatCanIDoWithImperiums">
                    <div slot="collapse-header">
                        What can I do with Imperiums?
                    </div>
                    <div slot="collapse-body">
                       Imperium is meant to be used as you would use just about any other currency: paying for products online, trading for goods, trading in for other currencies. In addition,  can be used for cross border payments with no currency exchange fees. The community around the open source project, Imperium, is continuously building the ecosystem.                    </div>
                </collapse-faq>Imperium

                <collapse-faq :selected="false" ref="HowCanIGetImperiums">
                    <div slot="collapse-header">
                        How can I get Imperiums?
                    </div>
                    <div slot="collapse-body">
                        1. You can mine them directly in your browser. 2. You can invite others to mine and refer you to get some rewards. 3. You can buy from the exchanges. 4. You can become a part of our bounty hunt program on https://Imperium.io/bounties.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HowMuchWebdEarnIn24HoursMining">
                    <div slot="collapse-header">
                        How much Imperiums (IDLL) can I earn in 24 hours of mining?
                    </div>
                    <div slot="collapse-body">
                        The amount of IDLL's that you can mine in 24 hours is solely based on the computational power of your devices & your mined coins stake and it is directly proportional to the power of the entire network.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HowAreWalletsSecured">
                    <div slot="collapse-header">
                        How are the wallets secured?
                    </div>
                    <div slot="collapse-body">
                        The wallets are stored directly into your browser, avoiding third parties. Your browser is the only one that is storing your wallet. NOTE: Like with any other coin or token, if you lose your wallet's recovery password, your Imperiums will be locked for ever.                     </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="UseOtherWallets">
                    <div slot="collapse-header">
                        Can I use other wallets to store IDLL, for example Ledger Nano S, Trezor, Keep Key, etc?
                    </div>
                    <div slot="collapse-body">
                        Yes! Now, you can download your wallet and store it on an external device and when you want to make a transaction, you can import the transaction or sign it online/offline with the wallet from the stored device. In the near future, Imperium will also be integrated to use dedicated crypto devices (Ledger Nano S, Trezor,etc).
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="ImportWalletBrowser">
                    <div slot="collapse-header">
                        Can I import an existing wallet into my browser?
                    </div>
                    <div slot="collapse-body">
                        Yes, you will be able to import and export your wallet from one browser to another one. The wallet is managed by your browser, not by the Imperium Protocol or other third parties.                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatIsAvaiableBalance">
                    <div slot="collapse-header">
                        What is available balance?
                    </div>
                    <div slot="collapse-body">
                        It is the balance stored into the blockchain by the whole network, which can only be changed by means of transactions.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="PotentialBalanceUpAndDown">
                    <div slot="collapse-header">
                        Why does the potential balance keep going up and down ?
                    </div>
                    <div slot="collapse-body">
                        Because the potential balance is just an estimate given by the pool that you are mining into.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HowDoImperiumBountiesWork">
                    <div slot="collapse-header">
                        How do Imperium's bounties work?
                    </div>
                    <div slot="collapse-body">
                        The Imperium's built-in automated bounty program is scraping the available social media channels and it is giving you a score, according to the impact of your posts about Imperium. This score will be used to split each section of the reward to all attendees. When providing your wallet for reward payments, you should post your wallet address in one of your posts from the social media account.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhatIsPoS">
                    <div slot="collapse-header">
                        What is PoS ?
                    </div>
                    <div slot="collapse-body">
                        Proof of Stake is the way to mine new coins using your already mined coin stack, instead of your CPU power, like you would do when mining with PoW.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhenMiningInPoSKeepAllOfStakeInOneWallet">
                    <div slot="collapse-header">
                        When mining in PoS rounds, do i have to keep all of my stake in one wallet ?
                    </div>
                    <div slot="collapse-body">
                        The chances are equal, even when you have many small wallets instead of a single, big one.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="StakingMyCoinsWithPOSRequiresCertainTypeOfDevice">
                    <div slot="collapse-header">
                        Is staking my coins with POS, requiring a certain type of device?
                    </div>
                    <div slot="collapse-body">
                        Every compatible browser will suffice, regardless of the device (PC, laptop, tablet, smartphone, etc).
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="HelpTheProjectWhomDoIContact">
                    <div slot="collapse-header">
                        I want to help the project. Whom do I contact?
                    </div>
                    <div slot="collapse-body">
                        Imperium is an open source project and anyone can join and help. You can contact our general manager and after talking with him, we will come to a conclusion as to which is the best way that you can help our project.

                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="ImplementWEBDAsAPaymentOption">
                    <div slot="collapse-header">
                        I have a business and would like to implement IDLL as a payment option. Is this possible? If so, whom should I contact?
                    </div>
                    <div slot="collapse-body">
                        Yes, it is possible. You have to get in touch with a member of our team. See the links in the team section.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="DoesItWorkOnAndroidPhones">
                    <div slot="collapse-header">
                        Does it work on Android phones?
                    </div>
                    <div slot="collapse-body">
                        Yes, it is working for Android browsers and we even have an app in Google Play Store for Imperium.
                    </div>
                </collapse-faq>

                <collapse-faq :selected="false" ref="WhereCanISeeTheSourceCode">
                    <div slot="collapse-header">
                        Where can I see the source code?
                    </div>
                    <div slot="collapse-body">
                        Because we like to be transparent all of our codebase is open source on our <a href="https://github.com/WebDollar" target="_blank">GitHub</a> . Anyone can see the code, contribute to it and verify if everything is working well.
                    </div>
                </collapse-faq>

            </div>

        </div>

        <Center>
            <h2 style="margin-top: 40px; letter-spacing: 1px;">Do you still have questions? <a href="https://t.me/WebDollar" target="_blank">Ask us on Telegram!</a></h2>
        </Center>

    </div>
</template>

<script>
    import CollapseFaq from './extend/CollapseFaq.vue';
    let VueScrollTo = require('vue-scrollto');

    export default {
        name: "YourComponent",
        components: {
            CollapseFaq
        },
        mounted() {
            let qHash = this.$route.params.qHash;

            if ((typeof qHash === 'undefined') || !this.$refs.hasOwnProperty(qHash)) {
                return;
            }

            let qRef = this.$refs[qHash];

            qRef.toggle();

            VueScrollTo.scrollTo(qRef.$el);
        }
    }
</script>
