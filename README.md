# Weather app. 
Created by Aco Vidovič.
Shows weather at requested location. 

This is a Node.js app. To run it locally, you need to have Node.js installed on your computer. Start the app locally with this command:

npm run start

The app runs on these ports:
<ul>
<li>when run locally, on port 3000.</li>
<li>when run in the cloud, it uses the cloud environment variable.</li>
</ul>
<h1>Deploying to Docker container</h1>
<ol>
<li>Create the image: docker build -t <imagename> .</li>
<li>Run the container with this command: docker run -t <imagename></li>
</ol>

<h1>Deploying to IBM Cloud Foundry</h1>
<ol>
<li>On your computer login to IBM Cloud with this command: ibmcloud login</li>
<li>Deploy to Cloud Foundry on IBM Cloud with this command: ibmcloud app push <appname></li>
</ol>
