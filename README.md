# Project-22 : Decentralized voting application


<h1> <b> Decentralized voting application </b> </h1>

<br/>

<h1> <b> Abstract </b> </h1>

This application is to provide a web-based decentralised voting application where each and every voter has a fair role to play. It uses blockchain mechanism and prevents double-voting and fraudulent voting. In this application, each voter registers with valid details and then votes to the corresponding party. Each registered voter has a unique voter ID. A set of authentication keys is generated against each voter. When a user votes, it is checked whether it is the first time or it is already done before. And it is ensured that there can be utmost only one vote casted from each voter. After passing through this verification, the vote is then recorded as done. All votes that are accepted require consensus across the network. No single node controls it and every node is an owner and each vote is peer-peer verified. 

Given that every recorded vote on the blockchain needs consensus on the network and the fact that it is merely impossible to manipulate too many systems at the time, the chances of fraudulent votes are very low. The voting system is 100% transparent, no central authority owns it and the voters identification remains confidential. Also, people don’t have to leave their sofa to cast their votes but they can do it online at their own convenience. Since this application is de-centralized, it ensures high availability and data security.

It provides:<br>
 a. Anonymity of voters: ensures that whoever is casting a vote, they are authorised to do so.<br>
 b. Only one vote per person: No one would be able to vote more than once in the same election.<br>
 c. Data integrity: Ensures that once voted, it cannot be manipulated.<br>

<br/>


<h1> <b> Architecture </b> </h1>

![image](https://user-images.githubusercontent.com/54567577/66624642-d9570200-eba5-11e9-9c5d-721e96b9310c.png)


<br/>

<h1> <b> Component </b> </h1>

[IBM Blockchain Platform](https://cloud.ibm.com/docs/services/blockchain/howto/ibp-v2-deploy-iks.html#ibp-v2-deploy-iks) provide to control and manage yblockchain components and certificates from one central console. It also allows flexible Kubernetes based deployment. <br>

[IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) is a managed container service that provides intelligent scheduling, self-healing, horizontal scaling, service discovery and load balancing and configuration management. The Kubernetes also provide container security, isolation policies and many tools in cloud deployment. <br>

[IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) helps developers to create, test and debug smart contracts, connect to Hyperledger Fabric environments, and build applications that transact on your blockchain network. <br>


<h1> <b> Technologies used </b> </h1>
[Hyperledger Fabric v1.4.3](https://www.hyperledger.org/projects/fabric) is a platform for distributed ledger solutions. It is designed to support pluggable implementations of different components, and accommodate the complexity that exist across the economic ecosystem. <br>

[Vue.js](https://github.com/vuejs/vue) is an open-source JavaScript framework, which can easily scale between a library and a framework depending on different use cases. <br>

[Node.js](https://nodejs.org/en/) is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code. <br>

[HTML5](https://www.w3.org/html/) is a software solution stack that defines the properties of web page content by implementing a markup based pattern to it. <br>

[React](https://reactjs.org/) is a JavaScript library for building user interfaces <br>



<h1><b> Team </b> </h1>
Manasa Hari <br> Parvathy Kannankumarath Madom Krishnan <br/>  Nihanjali Mallavarapu <br/> Sung-Yin Yang <br/> 



