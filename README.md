<h2>DWAD19 Project One</h2><br>
<h2><b>Project Name : SGxProperty</h2></b>

SGxProperty is a map-based application that checks for residential property transactions in Singapore. As more than 80% of the residential property in Singapore are flats built by the Housing & Development Board, the first released version is designed specially for home owners and buyers to check for Resale (Secondary Market) HDBs flats that were transacted in 2022. 

With the ever climbing property prices and the burst in property transactions during recent years, it has become important for home sellers to know how much their flat could fetch based on the recent transactions in their neighbourhood. 

Similarly for home buyers, it will be beneficial to study the transacted prices of flats in their favoured estate first before committing to any purchase.

At the moment, there is a lack of map-based web applications in the market for home sellers and buyers to intuitively check for past transactions of HDB Flats. 

To find out past HDB transaction prices, they either have to search it directly on HDB's website (https://services2.hdb.gov.sg/webapp/BB33RTIS/), which could be difficult to manoeuvre as there are too many irrelevant information, or enquire directly from their real estate agents. Alternatively, commercial portal portals such as PropertyGuru only displays partial information based only on a selected block of flat. 

The objective of SGxProperty is to provide an intuitive, no fuss and no frills way for home sellers and home buyers or anyone curious enough to look up for information of transacted flats in their estate.

The application can be access here: https://geriang.github.io/

<h3>UX/UI</h3>

- Full Map
- Clean UI only two interactive buttons

This section should: 
List down the user stories and their acceptance criteria. 
Share links to wireframes, mockups, diagrams that are used in the UI/UX processes. Those files can be pushed to the Github repository, or be placed in a separate PDF file as part of the repository. 
Describe what your considerations were for the Five Planes of UI/UX, such as the choice of color and fonts for the surface plane, or information organization strategy for the structure plane. 


<h3>FEATURES</h3>

Major features of the application includes:

- Introductory Modal Pop-up, explaining the application upon loading the webpage. (using Javascript DOM - addEventListener)

- Toggle on-off feature for the Introductory Modal (using Bootstrap Modal & Javascript DOM)

- Toggle on-off feature for the search form, and auto collapse when search is triggered (Bootstrap inbuilt form features)

- Postal Code field that generates an address automatically (Javascript DOM - addEventListener(keyup) & axios.get)

- A lock feature that disables the submit button when the postal code field is not filled up to 6 digits. The lock feature however can be removed by   entering 6 non-digit characters or symbols in the field and this issue needs to be rectified. (Javascript DOM and Bootstrap inbuilt button disabler)

- Tool tips for all the fields in the search form (Javascript DOM - addEventListener(mouseover))

- A loading spinner when the search is running to show that the search function is operating correctly (Bootstrap Load Spinner feature & Javascipt DOM)

- A modal pop-up appears when the search is completed, showing the search result which either reflects the number of transactions found or no transaction was found (Bootstrap inbuilt Modal feature & Javascript DOM - getElementById & InnerHTML)

- Mobile Responsive (Bootstrap)


<h3>TECHNOLOGIES USED</h3>

The project is written in HTML, CSS, and Javascript languages. 
The following libraries were used:
Bootstrap - https://getbootstrap.com/ for pre-built HTML, CSS & Javascript web features such as forms, modal, loading spinner and buttons
used in https://github.com/geriang/geriang.github.io/blob/main/index.html

Leaflet - https://leafletjs.com/ for pre-built Map features
used in https://github.com/geriang/geriang.github.io/blob/main/map.js

Axios - https://axios-http.com/docs/intro for making async API calls and requests.
mainly used in [data_govsg.js & data_onemap.js](https://github.com/geriang/geriang.github.io/blob/main/data_govsg.js) (https://github.com/geriang/geriang.github.io/blob/main/data_onemap.js)

Data Sources consumed:

Data.gov.sg
https://data.gov.sg/dataset/resale-flat-prices?view_id=093ff0f0-783f-4f6a-be52-7e506a8c58ca&resource_id=f1765b54-a209-4718-8d38-a39237f502b3

One Map
https://www.onemap.gov.sg/docs/#onemap-rest-apis


<h3>TESTING</h3>

Loading the main page 

User Story : US
Testing instructions : TS
1.US: I want to have an overview of what the web-app is for and how to use it. 
  TS: Modal with description shows up after the main page finished loading.

2.US: I accidentally closed the pop up modal. I want to see the modal with description again.
  TS: Click on the information icon (depicted by "i") to open the modal again and click anywhere outside the modal or "X" to close

3.US: I want to start searching for transacted HDB Flats near my home.
  TS: Click on the search icon (depicted by a magnifying glass)
  
4.US: I am not sure what are the displayed fields are for.
  TS: Mouseover (desktop) or tap (mobile) the fields to display the purpose of the fields
  
5.US: I want to key in my address conveniently using my postal code.
  TS: Type in the full 6 digit postal code in the Postal Code field
  
6.US: I want to find the transacted flats that are similar to my current flat type.
  TS: Click on the drop down field to select the desired flat-type
  
7.US: I want to search HDB resale transactions along the road where my flat is at 
  TS: Click on Entire Street radio button and click Submit Button
  
8.US: I wamt to search HDB resale transactions that are nearby and surrounding my flat.
  TS: Click on the Nearest Block radio button and click Submit Button



4.US: I want to start searching where and what are the HDB flats that are sold along the street of my home address
  TS: 


Provide proof that you have done testing on your project. You can provide step by step instructions for the examiner to test the project. Use your user stories and their acceptance criteria as a starting point. Do note that any unhandled exceptions, console errors etc will be considered as failing the testing criteria. 
You may want to provide manual test cases. An example of a manual test case could be: 

1. Loading the main page
1. Test that user can sign in 
a. From the home page, click on the 'Login' button 
b. Fill in a valid username and password and click on the 'Login' button c. The user should be redirected to the profile page 
2. Test user entering an invalid password 
a. From the home page, click on the 'Login' button 
b. FIll in a valid username but an invalid password, and click on the 'Login' button c. The user should be informed that the login has failed.



You can consider putting your manual test cases in a PDF file if they make your readme file too long. 
TEST CASES
If you wish to present your testing steps in a clearer method, consider writing test cases. A test case consists of the following structure:


Test Case #
Test Case Description
Test Steps
Expected Result


Prerequisite: The user is at the calculate BMI form




1
Calculate the BMI 
1) Enter the weight into the textbox as 84kg
2) Enter the height into the textbox as 1.71
3) Click the Calculate Button
The BMI is shown as 28.7


The above format is just an example. As long as you provide:
A description of the test case
The steps for performing the test
The expected results
Any assumptions or prerequisites

The examiner must be able to follow your test case.

<h3>DEPLOYMENT</h3>
Describe the process that you used to host your website on a hosting platform (such as Github pages or Heroku). Provide the following details: 
1. What is your hosting platform? 
2. How is the database hosted? 
3. What are the environment variables and what are they responsible for? 4. What are the dependencies that your project used? 
5. What are the deployment steps for the project? 
You can provide deployment details in a separate document (PDF or another markdown file). There is no need to be original for this section; if another website or document have the steps, just link there and acknowledge the author in your credits, 

<h3>LIVE LINK</h3>
You should include a live link to your deployed web site.

<h3>CREDITS AND ACKNOWLEDGMENT</h3>
Put here all the code, content and assets that you have used. If you have used a piece of code from an external website, please acknowledge it and provide a link to it. 
