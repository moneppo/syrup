Syrup
=====

Web boilerplate/framework for SAP (Software As a Product) apps. SAP in a nutshell: eliminate the difference between an app, a web app, and an application.


What is SAP?
------------

Software As a Product is the idea that by structuring a web app for offline experiences first, you can create a single app that seamlessly works as a local (double-click installed) application, a website, or an app, with transparent, automatic updates. Essentially you get all the benefits the web promises: multi-platform support, transparent updates, open standards, etc. in every environment you want to deploy to. 

The name is a play on the idea of Software as a Service (SaaS) where it is assumed that when one is always online and always connected, there is little to no need for local storage. SAP assumes the opposite - connectivity is rarely consistent, especially on mobile devices - and therefore changing the architecture of apps to assume the disconnected state first provides a better user experience, while providing most of the benefits of SaaS.

There are 4 key principles to SAP:
 1. Offline First: Connectivity is rarely consistent, especially on mobile devices. Design your apps assuming that the user only has connectivity for short periods.
 2. One App for Web, Mobile, and PC: We're so close to making a system where a company can make one software product to serve all the relevant computing use cases. There's no reason to have it be fragmented by app stores and installations.
 3. The Cloud is Overrated: Not to say that the cloud isn't useful, but the concept of "always online, always connected" is flawed. We sacrifice more than we realize by pushing everything to the cloud. We are tethered to WiFi hotspots, cursing at poor connections. We lose privacy, and there's questionable use of our data when we push it to the cloud. A central set of companies rule our internet. I believe that if applications are decentralized, both the developer and the user has better control over their computing experiences. [Explain Peer-To-Peer]
 4. Sync, Don't Get: Fetching data through XHR means a constant connection. It's better to sync logical chunks of data locally and store them rather than keep asking a server for the information. This is the major reasoning for choosing CouchDB for SAP - CouchDB's replication capabilities enable a sync model much more easily than most other database servers.
 5. MVC is Key: Providing models and views that react to model changes is great. We love frameworks like Angular and Backbone. But more critically, tools like this make views into templates, which can be treated like static assets. Having as much of your app in a static form as possible, the easier it is to maintain the app as a cached offline version. Another way to think about this is understand the difference between the assets that make up your app, and the data that drives it. This also works around some of the current shortcomings of HTML5 Application Cache. I recommend reading [Section 12 of Jake's excellent article](http://alistapart.com/article/application-cache-is-a-douchebag#section12).

What is Syrup?
--------------

Syrup is the baseline tools to make a SAP application. Syrup comes with two parts:
 * A basic application boilerplate based on the HTML5 Application Cache, PouchDB, and some other basic stuff. The boilerplate also includes some nice widgets to use to make download links for your app onto various platforms.
 * A node server for auto-managing your app. Since a SAP app is meant to be client-first, the services needed on the server are very light - essentially just file serving and maintaining the cache file. This server will automatically update the cache file when you update files associated with the app. It even includes a Procfile for deployment to Heroku. 
