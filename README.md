<b>DWAD19 Project One</b><br>
<b>Project Name : SGxProperty</b>

SGxProperty is a map-based application that checks for residential property transactions in Singapore. As more than 80% of the residential property in Singapore are flats built by the Housing & Development Board, the first released version is designed specially for home owners and buyers to check for Resale (Secondary Market) HDBs flats that were transacted in 2022. 

With the ever climbing property prices and the burst in property transactions during recent years, it has become important for home sellers to know how much their flat could fetch based on the recent transactions in their neighbourhood. 

Similarly for home buyers, it will be beneficial to study the transacted prices of flats in their favoured estate first before committing to any purchase.

At the moment, there is a lack of map-based web applications in the market for home sellers and buyers to intuitively check for past transactions of HDB Flats. 

To find out past HDB transaction prices, they either have to search it directly on HDB's website (https://services2.hdb.gov.sg/webapp/BB33RTIS/), which could be difficult to manoeuvre or enquire directly from their real estate agents. Alternatively, commercial portal portals such as PropertyGuru only displays partial information based only on a selected block of flat. 

The objective of SGxProperty is to provide an intuitive, no fuss and no frills way for home sellers and home buyers or anyone curious enough to look up for information of transacted flats in their estate.

The application can be access here: https://geriang.github.io/

<u>UX/UI</u>

- Full Map
- Clean UI only two interactive buttons

This section should: 
List down the user stories and their acceptance criteria. 
Share links to wireframes, mockups, diagrams that are used in the UI/UX processes. Those files can be pushed to the Github repository, or be placed in a separate PDF file as part of the repository. 
Describe what your considerations were for the Five Planes of UI/UX, such as the choice of color and fonts for the surface plane, or information organization strategy for the structure plane. 

FEATURES

List down the major features of your application, and also the algorithms that you have used to implement those features. If there are any limitations or bugs, please describe them as well. If you have any features pending implementation, you can also take the opportunity to discuss them here.
Major features of the application includes

- Introductory Modal Pop-up, explaining the application upon loading the webpage

- Toggle on-off feature for the Introductory Modal

- Toggle on-off feature for the search form, and auto collapse when search is triggered

- Postal Code field that generates an address automatically

- A lock feature that disables the submit button when the postal code field is not filled up to 6 digits. The lock feature however can be removed by   entering 6 non-digit characters or symbols in the field and this issue needs to be rectified. 

- Tool tips for all the fields in the search form

- A loading spinner when the search is running to show that the search function is operating correctly.

- A modal pop-up appears when the search is completed, showing the search result which either reflects the number of transactions found or no transaction was found



USER STORIES
If you wish to present the features list in a form more suitable for software development, you can write them as user stories instead. 
A basic user story consists of: 
 The role, or type of the user
A statement describing what the user wishes to a
A statement describing the intent of the user
Explain what features in your application can meet this particular user story.

TECHNOLOGIES USED
Provide an overview of the languages, frameworks, libraries and any other tools that you have used to produce the project. Be sure to provide a short description of where in the project the technology is used, and a URL to its Github repository. 
TESTING
Provide proof that you have done testing on your project. You can provide step by step instructions for the examiner to test the project. Use your user stories and their acceptance criteria as a starting point. Do note that any unhandled exceptions, console errors etc will be considered as failing the testing criteria. 
You may want to provide manual test cases. An example of a manual test case could be: 
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
DEPLOYMENT
Describe the process that you used to host your website on a hosting platform (such as Github pages or Heroku). Provide the following details: 
1. What is your hosting platform? 
2. How is the database hosted? 
3. What are the environment variables and what are they responsible for? 4. What are the dependencies that your project used? 
5. What are the deployment steps for the project? 
You can provide deployment details in a separate document (PDF or another markdown file). There is no need to be original for this section; if another website or document have the steps, just link there and acknowledge the author in your credits, 
LIVE LINK
You should include a live link to your deployed web site.

CREDITS AND ACKNOWLEDGMENT
Put here all the code, content and assets that you have used. If you have used a piece of code from an external website, please acknowledge it and provide a link to it. 
