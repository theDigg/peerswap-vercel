# Peerswap demo for q3 2021

## Introduction

`--------------Kyle Speaking--------------`

Hello everyone! Thanks for checking out our Q3 presentation of shardus this Saturday, or if you're from the future, whenever you happen to see this.

Aamir and I will be demonstrating an app that I've been working on this quarter called Peerswap. Up until now, if you've been following shardus, you've seen applications that deal with sending tokens or messages between users, and the ability of any user to change network parameters through proposals that get voted on by the community. Today we're taking shardus a step further to demonstrate how it could be used for a decentralized cross chain swap service. Let's get right into it.

## Registration process

`--------------Kyle Speaking--------------`

The first thing users see when they visit the site is a welcome page with a simple timeline graphic of information on how to get started.

When the app is completed, we will have an automated market maker that will allow users to swap between DAI and peerswap DAI for use on the platform in the form of collateral used for swaps.

Below the timeline we can see options for register, and import private key, since we're starting from scratch and don't already have an account we'll be clicking register `*Clicks  Register*`.

All you need to do here is enter your desired user alias and hit register. The alert above the input will notify you if the alias you chose has already been registered.

I'm going to register with the alias "kyle" `*Clicks register*` and Aamir will do the same using his name.

## Dashboard

`--------------Kyle Speaking--------------`

When the server completes the registration process, you get redirected to your dashboard, where you can see your account balance, your swaps, and your bids.

Since this is a new account we don't see anything in those sections, but we'll come back to this page in a bit.

Below the account info there's a few filter settings for finding specific swaps of yours that you want displayed. You can enter tokens separated by spaces to include only the swaps that deal with those tokens.

Going forward, you may see or hear terms like "Initiator", and "Provider". Initiator just refers to a user who creates a swap, and provider refers to a user who bids on a swap.

Before we get into the process of making swaps, I'll hand the baton over to Aamir to talk about some of the features we kept from liberdus

## Liberdus features

`--------------Aamir speaking--------------`

Peerswap kept most of the features that we had in liberdus, but for the sake of time and simplicity, we won't submit any transfers or proposals. Instead, we'll just show you where they are.

For sending tokens we can hit send here under the account info `*clicks send button*`, this takes us to the wallet page which you can also find by clicking the bank icon in the navbar on the left.

For receiving tokens, we can hit this receive tab `*clicks receive tab*`.

The governance system for changing the network parameters is here in this economy page `*clicks economy page*`. Here's where you can view the current parameters used by the network along with a form for submitting a proposal to change them.

When we click this "Vote" button over here on the right `*Clicks vote button*`, we're taken to a page where we can view the current proposals submitted by users, and the default proposal for keeping the parameters as they is at the top.

By clicking the carat icon at the bottom of each proposal we can see a form for submitting a vote `*Clicks carat Icon*`.

Now with the main features we previously demonstrated out of the way, I'll hand it back over to kyle to talk about submitting swaps.

* Talk about the basic Send and receive tabs
* Talk about the network governance system in the economy page
* Show where you can submit proposals and vote on proposals

## Submitting a swap request

`--------------Kyle Speaking--------------`

Thanks Aamir, so in order to submit a swap you can either go to our wallet page and then click on the swap tab here in the middle, or, from our dashboard we can click on this swap button which will take us directly to the form `*Clicks swap button*`. Aamir and I will each submit a swap to the network using a different swap type.

There are three types of swap you can submit, "immediate", "offer", and "request". They go from strict to open ended. The immediate swap is what most people are used to, where I have something to give, and I know what I want in return for it. The offer swaps means I have something to give, and I want to see what people will give me for it. The last type of swap is the request swap, and the request swap is for when I want something, and I want to see what people want in return for giving me the thing I want.

I will select immediate as my swap type `*Clicks immediate*`.

You can also see information about the swap type when you select it.

I have some ETH that I want to swap for USDT, so I will select ETH as the token I'm offering and `0.1` for the amount, then USDT as the token I'm requesting and `350` for the amount.

The max time to send and receive inputs specify the amount of time (in seconds) each user is allowed to send their offer starting from the time the initiator accepts a bid.

The last input field "collateral" is the amount of DAI each user has to put up as collateral for the swap. Ideally, this should be equal to the $USD value of the asset you're swapping. Since ETH is somewhere around $3500 per token, 0.1 ETH will be roughly $350 so I'll put 350 for the collateral.

To submit, click the swap button at the bottom `*Clicks swap*` and we're good to go.

One thing to note on this immediate swap type is that the network automatically accepts the first bid that gets placed. This is great for when you want the swap process to go quickly and it's similar to what everyone is used to with services like Uniswap, the difference being that you are swapping with another person, and not a liquidiy pool.

Now i'll pass it back over to Aamir to demonstrate submitting an offer swap.

`--------------Aamir speaking--------------`:

Alright, so I'm going to head over to the swap form and select offer for my swap type `*Clicks offer swap type*`

Since I have some ULT that I want to swap for something, I will offer ULT as my token and use 5000 for the amount.

That will be somewhere around $600 so i'll put in 600 for the collateral and THAT'S IT!. We're done and I can submit the swap to the network `*Clicks SWAP*`.

Now it's a good time to talk about the lifecycle of a swap. Every swap has 4 potential status states they can be in which are "open", "exchanging", "complete" and "disputing".

"Open" means that the initiator has not accepted a bid yet and the swap is open to users submitting bids, you're only able to bid on a swaps with this status.

"Exchanging" means that a bid has been accepted by some initiator, and both parties should be sending each other the assets agreed upon using whatever network they belong to.

"Disputing" will mean that one of the users hadn't honored the agreement and the swap is going to be reviewed by a jury.

"Complete" means that both parties have received the assets they requested and had the collateral returned to them.

I'll hand it over to kyle to talk about the process of finding and bidding on swaps.

* Talk about request swaps
* Submit a swap requesting ULT for the token, 5000 for the amount, and `0xfcf0ddd01904247c5325538631a8943bafb63bab` as the ETH address
* Talk about the immediate swap type

## Searching for swaps

`--------------Kyle speaking--------------`

Now that we both submitted our swaps, we can search for them in the swaps page `*Clicks swaps page*`. Here we can see a list of rows corresponding to the swaps that are in the network.

To easily search for the latest ones, we can head over to the "Date Created" column and click this arrow icon twice in order to sort by most recent `*Clicks arrow twice*`.

I can see Aamir's swap here along with all the swaps that came before it.

This page gives you a lot of nice abilities like hiding certain columns, stacking filters, changing the density, and exporting the swaps you found in CSV format.

You're given a lot of powerful tools you can use to narrow down the swaps you're looking for.

In this action tab over on the left, I can hit this tag icon to go to that individual swap's page so that I can bid on it `*Hits Bid Icon*`.

Here is all the swap's information, a form to place a bid, and the bids that have been placed by other users. There aren't any bids at the moment, but we'll change that by requesting ETH in exchange for buying the ULT that he wants to swap. `*Fills in form to request ETH*`

I'll put in my ETH address where I want to receive the ULT `0xfcf0ddd01904247c5325538631a8943bafb63bab`.

Now I'll' hit "Place Bid" and you should see a bid appear in this section shortly `*Hits place bid... waits for bid to show up*`.

There it is, so I'm done with placing my bid on Aamir's swap, now let's have him do the same for mine.

`--------------Aamir speaking--------------`

Cool so I'm still on the swap page and I found kyle's swap request right here `*Clicks bid*`, Since Kyle used an immediate swap, the exact token amounts are already specified so all I have to do is enter my address.

`* paste 0x04d6e89719b2efc3b34a0436a448d1498b44f955 *`

And now im ready to place the bid `*Hit Place bid*`.

Let's wait and see what happens when the bid shows up. Since the swap type is immediate, it should show up in the exchanging status state.

There it is, awesome.

* Find kyle's swap request and click Bid
* Request 350 USD in the bid and paste `0x04d6e89719b2efc3b34a0436a448d1498b44f955` for the address
* place the bid

## Interactions with swaps and bids

`--------------Aamir speaking--------------`

Now that we've both placed bids on each other's swaps, let's return to the dashboard and see what's going on there. `*Clicks on dashboard page*`

Looks like I have a swap and a bid showing up here now. In order to see the bids that have been placed on my swap I can hit this carat icon in the lower right corner of the swap to expand it `*Hits carat*`.

All the info on this dashboard updates in realtime, so as users place bids, or accept any bids I make, you will see it update. I could sit here and wait for more to show up, or I could just accept kyle's offer. I'll accept the offer, but first I need to make sure he has my ETH address so he knows the address to send it to.

I'll use `0x04d6e89719b2efc3b34a0436a448d1498b44f955` for that and accept the bid `*hits checkmark icon*`.

We'll wait for the swap status to be updated to reflect that we're now in the exchanging state of the swap lifecycle.

This would be the time to send kyle my ULT, and for him to send me his ETH.

Since this is just a demo, We'll hit this double check mark icon to confirm that I received the ETH `*Clicks double check mark icon*`.

In a real world scenario, you would obviously wait to receive the tokens, and if kyle doesn't honor the agreement, or fails to send the tokens altogether, I can hit this warning icon to send a signal to the network that something went wrong and I want to open a dispute for this swap.

As mentioned previously, this feature is still in development, but that's how it could work.

Now we can see that kyle has marked the swap as successful, and I got back the DAI that was put up as collateral.

* Return to the dashboard
* Talk about how to view bids on your swap + updates in realtime
* Accept kyle's bid on your swap
* Wait for swap status to show "exchanging"
* Talk about real world scenario of now sending the Tokens
* Click mark swap as successful "Double checkmark icon" on both swap and bid
* Talk about potential dispute scenario
* Reiterate disputes are still in development
* Show that as your swap status changes to "complete" you get your collateral back

## Transactions

`Aamir speaking:`
lets go ahead and check out one last page for our transactions `*Clicks transactions page*`.

Here is where we can see our transaction history we've submitted to the network. Just like the swaps page, we can use all those powerful tools to find the transactions we're looking for.

The "data" tab contains the raw JSON format of the entire transaction.

* Talk about transaction history page, the tools for searching for a transaction.

## Q & A + Giving the link

`--------------Aamir Speaking--------------`

That about wraps it up for our first demo presentation of peerswap. We hope you enjoyed, and we hope that you try it out at [https://peerswap.vercel.app](Peerswap). Lets us know if you have any questions and we'll be happy to answer them.
