# Peerswap demo for q3 2021

## Introduction

`Kyle Speaking:`
Hello everyone! Thanks for checking out our Q3 presentation of shardus this Saturday, or if you're from the future, whenever you happen to see this. Aamir and I will be demonstrating a dapp that I've been working on this quarter called Peerswap. Up until now, if you've been following shardus, you've only seen applications that deal with sending tokens or messages between users and the ability to change the parameters of that network through a DAO governance system. Today we're taking shardus a step further to demonstrate how it could be used for a decentralized cross chain, cross asset swap service. Let's get right into it.

## Registration process

`Kyle Speaking:`
The first thing users see when they visit the site is a welcome page with a simple timeline graphic of information on how to get started. When the app is completed, we will have an automated market maker that will allow users to swap between DAI and peerswap DAI for use on the platform in the form of collateral used for swaps. Below the timeline we can see options for register and import private key, since we're starting from scratch and don't already have an account we'll be clicking register `*Clicks  Register*`. All you need to do here is enter your desired user alias and hit register. The alert above the input will notify you if the alias you chose has already been registered. I'm going to register with the alias "kyle" `*Clicks register*` and Aamir will do the same using his name.

## Dashboard

`Kyle Speaking:`
When the server completes the registration process, you get redirected to your dashboard, where you can see your account balance, your swaps, and your bids. Since this is a new account we don't see any swaps or bids in those sections, but we'll come back to this page in a bit after making some swaps. Below the account information we have a few filter settings for narrowing down the swaps you wish to be displayed on the page. You can enter token tickers separated by spaces to include only the swaps that include those tokens in your dashboard.

Going forward, we will be using some new terminology to refer to the users that initiate or create a swap by "Initiator", and "Provider" to refer to a user that places a bid on a swap. I'll hand the speaking baton over to Aamir to talk about the features we kept from liberdus

## Liberdus features

`Aamir speaking:`
Peerswap incorporates most of the features that are available in liberdus, including our ability to send and receive tokens in the wallet page. For the sake of time and simplicity, we'll show you the pages for sending tokens `*clicks send button*` and for receiving tokens `*clicks receive tab*` but since you've already seen most of this stuff, we'll skip the demonstration for it today. We included the governance system for changing the network parameters we had implemented in liberdus `*clicks economy tab*`. Here's where you can view the current parameters utilized by the network along with the form for submitting proposals. When we click on this "Vote" button here `*Clicks vote button*`, we're taken to a page where we can view the list of current proposals submitted by users with the default proposal for keeping parameters as they are at the very top. By clicking the carat icon below each proposal we can see a form for submitting a vote on that proposal `*Clicks carat Icon*`. Now with the main features we previously demonstrated out of the way, I'll hand it back over to kyle to talk about submitting swaps.

* Talk about the basic Send and receive tabs
* Talk about the network governance system in the economy page
* Show where you can submit proposals and vote on proposals

## Submitting a swap request

`Kyle Speaking:`
Thanks Aamir, so in order to submit a swap you can either click on the bank icon here on the left to go to our wallet page and then click on the swap tab here in the middle, or, from our dashboard we can click on this swap button under our account info, which will take us directly to the swap form `*Clicks swap button*`. Aamir and I will each submit a swap to the network using a different swap type. I will go first and select offer for my swap type `*Clicks offer*`. You will see an alert with information about what each swap type represents when you select it. Offer swaps are for used when you want to offer a token that you have while being open to receiving tokens offered in bids by providers. Since I have some ETH that I want to swap for something, I will offer ETH as my token along with the amount i'm offering which is `0.1 ETH`. The max time to send and receive form inputs is to specify the amount of time each user is allowed to send their offered token, which begins when the bid is accepted by the initiator on their swap. The last form input "collateral" refers to the amount of DAI each user has to put up as collateral for the swap. Ideally, this should be more or less equal to the value in $USD of the amount of ETH offered in the swap. Since ETH is about $3500 per token, and I'm offering 0.1 ETH, I will use 350 DAI for the collateral. To submit, we click this swap button below the form `*Clicks swap*`, and we're good to go. Now i'll pass it back over to Aamir to demonstrate submitting a request swap.

`Aamir speaking`:
Very similar to the previous offer example, a request swap is basically the reverse. Here I can enter a token that I want to receive in the swap, and be open to sending the token that a provider might request in a bid. Since I can't get enough ULT, I will request ULT as my token. Since I already know the token I want to receive, there is a form field for providing the blockchain address where I want the provider to send the ULT when I accept their bid. I'll use `0xfcf0ddd01904247c5325538631a8943bafb63bab` as my ETH address `*copies and pastes the address*` The amount I want is 5000 tokens, and that will roughly be worth about $600 so i'll put in 600 for the collateral. Now we're done and I can submit the swap to the network `*Clicks SWAP*`. The last swap type is called "Immediate" and is used for when you know the token you want to offer and receive, along with the amounts. One thing to note on this swap type is that as soon as a provider places a bid, the network will automatically accept the first bid that gets placed. This is great for when you want the swap process to go quickly, but you need to make sure you specify the exact terms you want and double check because as soon as someone places a bid, you're locked in to that contract and will have your collateral removed until the swap is complete, or you win a dispute if that occurs. I'll hand it over to kyle to talk about the process of finding and bidding on swaps.

* Talk about request swaps
* Submit a swap requesting ULT for the token, 5000 for the amount, and `0xfcf0ddd01904247c5325538631a8943bafb63bab` as the ETH address
* Talk about the immediate swap type

## Searching for swaps

`Kyle speaking:`
Now that we both submitted our swaps, we can search for each other's swap requests in the swaps page `*Clicks swaps page*`. Here we can see a list of rows corresponding to the swaps that are in the network. In order to easily search for the latest ones, we can go over to the "Created at" column and click this arrow icon twice `*Clicks arrow twice*` in order to sort by most recent in descending order. I can see Aamir's swap request at the top of the page here along with all the swaps that came after it. This grid gives you the ability to hide columns, stack filters using any combination of column values, change the density, export the swaps in CSV format, change the page size, change the amount of rows that are displayed in the grid, and change the theme to match the ant design specification. You have a lot of powerful tools you can use to narrow down the exact swaps you're looking for. I'm going over to the action tab so that I can bid on Aamir's swap request, so lets hit it `*Hits Bid Icon*`. This takes me to a page for that swap information, where we can see a form to place a bid, and the bids that have already been placed by other users. Since this swap is new, there aren't any bids at the moment, but we can change that by offering Aamir ETH in exchange for sending him the ULT that he wants. `*Fills in form to send aamir ETH*` Now I can hit the "Place Bid" button and you should see a bid appear under the form shortly `*Hits place bid... waits for bid to show up*`. There it is, so I'm done with placing my bid on Aamir's swap, now let's have him do the same for mine.

`Aamir speaking:` Cool so I'm still on the swap page and I found kyle's swap request right here `*Clicks bid kyles swap*`, I'm going to place a bid and request 350 USDT for sending kyle ETH. `*Enters information*` Im going to paste my ETH address into the form `*Paste 0x04d6e89719b2efc3b34a0436a448d1498b44f955*` and now im ready to place my bid.

* Find kyle's swap request and click Bid
* Request 350 USD in the bid and paste `0x04d6e89719b2efc3b34a0436a448d1498b44f955` for the address
* place the bid

## Interactions with swaps and bids

`Aamir speaking:`
Now that we've both placed bids on each other's swaps, let's return to our dashboard and see what's going on there. `*Clicks on dashboard page*` I now have a bid and a swap showing up in the dashboard. I can see all the bids that have been placed on my swap by hitting the carat icon in the lower right corner of the swap card. `*Hits carat*` These bids will update in realtime as providers are placing them on my swap, so I could sit here and wait for more to show up, or I could just accept kyle's offer. I'll accept the offer `*hits checkmark icon*`, and kyle will do the same on his side. We can wait for the swap status to be updated to reflect that we're now in the exchanging status of the swap process. This would be the time to send kyle my offer, and vice-versa. Since this is just a demo, We'll hit this double check mark icon to signal that I have confirmed that I received the tokens I requested `*Clicks double check mark icon*`. In a real world scenario, you would obviously wait to receive the tokens, and if the provider doesn't honor the agreement, or fails to send the tokens altogether, I can hit this warning icon to indicate that something went wrong and I need to dispute this swap in court. As mentioned previously, this feature is still in development, but that's how it would work. Now we can see that kyle has marked the swap as successful, and I got back the DAI that was put up as collateral.

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
That about wraps up the basics on how to use peerswap, now lets go ahead and check out one last page for our transactions `*Clicks transactions page*`. Here is where we can see our entire transaction history we've submitted to the network. Just like the swaps page, we can use powerful tools to find the transactions we're looking for, and export them as a CSV.

* Talk about transaction history page, the tools for searching for a transaction, and exporting them to a CSV file

## Q & A + Giving the link

`Aamir or kyle speaking:`
That about wraps it up for our first demo presentation of peerswap. We hope you enjoyed, and we hope that you try it out at https://peerswap.vercel.app. Lets us know if you have any questions and we'll be happy to answer them.