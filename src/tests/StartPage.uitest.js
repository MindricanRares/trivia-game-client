// import { Selector } from "testcafe";

// fixture`Testing Start page`.page`http://localhost:3000/components/StartPage`;

// test("No input,Button should be False on click", async t => {
//   const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//   await t.click(readyBtn);
//   await t.expect(readyBtn.innerText).eql('FALSE\n');
// });

// test("Complete name and code correctly , button should return TRUE", async t => {
//   const nameInput = Selector('#root > div > div > div > form > div:nth-child(4) > div > input');
//   await t.typeText(nameInput,"NoName");
//   const codeInput = Selector('#root > div > div > div > form > div:nth-child(7) > div > input');
//   await t.typeText(codeInput,'12345')
//   const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//   await t.click(readyBtn);
//   await t.expect(readyBtn.innerText).eql('TRUE\n');
// }); 


// test("Complete with code but no name , button should be False on click", async t => {
//   const codeInput = Selector('#root > div > div > div > form > div:nth-child(7) > div > input');
//   await t.typeText(codeInput,'12345')
//   const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//   await t.click(readyBtn);
//   await t.expect(readyBtn.innerText).eql('FALSE\n');
// });

// test("Complete name but not code and click on Button should return False", async t => {
//     const nameInput = Selector('#root > div > div > div > form > div:nth-child(4) > div > input');
//     await t.typeText(nameInput,"NoName");
//     const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//     await t.click(readyBtn);
//     await t.expect(readyBtn.innerText).eql('FALSE\n');
//   });

//   test("Complete with a wrong name but correct code , button should return False", async t => {
//     const nameInput = Selector('#root > div > div > div > form > div:nth-child(4) > div > input');
//     await t.typeText(nameInput,"thisIsAWrongName");
//     const codeInput = Selector('#root > div > div > div > form > div:nth-child(7) > div > input');
//     await t.typeText(codeInput,'12345')
//     const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//     await t.click(readyBtn);
//     await t.expect(readyBtn.innerText).eql('FALSE\n');
//   }); 

  
//   test("Complete with a profane name but correct code , button should return False", async t => {
//     const nameInput = Selector('#root > div > div > div > form > div:nth-child(4) > div > input');
//     await t.typeText(nameInput,"aFagGot");
//     const codeInput = Selector('#root > div > div > div > form > div:nth-child(7) > div > input');
//     await t.typeText(codeInput,'12345')
//     const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//     await t.click(readyBtn);
//     await t.expect(readyBtn.innerText).eql('FALSE\n');
//   }); 


//   test("Complete with a correct name but incorrect code , button should return False", async t => {
//     const nameInput = Selector('#root > div > div > div > form > div:nth-child(4) > div > input');
//     await t.typeText(nameInput,"NiceName");
//     const codeInput = Selector('#root > div > div > div > form > div:nth-child(7) > div > input');
//     await t.typeText(codeInput,'asd45')
//     const readyBtn=Selector('#startPageButtonsContainer > button:nth-child(1) > span.MuiButton-label-50');
//     await t.click(readyBtn);
//     await t.expect(readyBtn.innerText).eql('FALSE\n');
//   }); 




