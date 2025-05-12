module.exports = {
  navBar: {
    htmlLink: 'a.ga-nav.subtopnav_firstitem',
    bootStrap:'a.ga-nav[href*="/bootstrap"]',
    javaScript:'a.ga-nav[href="/js/default.asp"]',
    loginLink: 'a.tnb-login-btn[href*="/log-in"]',
    signupLink:'a.tnb-signup-btn[href*="/sign-up"]'
  },
  htmlPage: {
    htmlHome:'a.active[href="default.asp"]',
      Homepage: {
        Dashboard:'h1 > span.color_h1'
      },
    heading: 'h1',
    tryItYourself: 'text=Try it Yourself »'
  },
  loginPage: {
    heading: 'role=heading[name="Log In"]',
    emailInput: 'input.LoginForm_login_input__PNKob[name="email"]',
    passwordInput: 'input.LoginForm_login_input__PNKob[name="password"]',
    submitButton: 'button[class*="LoginForm_login_button"]',
    confirmationMessage: 'text=We\'ve sent an email to',
    // ... other login page locators
  },
  signupPage:{
    submitButton:'button[type="submit"]',
    confirmationMessage:'div.Alert_success__96bLv',
    errorMsg:'div.SignUpForm_error_text__vt1BO'
  },
  dashBord:{
    text:'a#pathfinder-link'

  },
  bootStrap:{
    b5btn: 'a.w3-button[href*="/bootstrap5/index.php"]', //bootstrap5 button
    dashBord: 'span.color_h1',
    color:{
      bs5Color:'//a[text()="BS5 Colors"]',
      txtColor:'a.done[href="bootstrap_colors.php"]' //Side bar
    },       
  },
  tables:{
      navBarTable:'(//a[text()="HTML Tables"])[1]',
      tableLocators : {
        table: '//table[@id="customers"]',//table inside iframe
        header: 'th',
        rows: 'tbody tr',
        cell: 'td'
       }    
    },
  alert:{
    jsAlertPopup: '//a[text()="JS Popup Alert"]',
    alertpg:'//h2[text()="Confirm Box"]',
    tryItYourself:'a.w3-btn[href="tryit.asp?filename=tryjs_confirm"]',
    tryItBtn:'//button[text()="Try it"]',
    iframe:'iframe[name="iframeResult"]',
    successMsg:'p#demo'
  },
  dragAndDrop:{
      htmlDragAndDrop: '//a[text()="HTML Drag and Drop"]',
      firstRect:'(//div[@id="div1"])[1]',
      secondRect:'(//div[@id="div2"])[1]',
      dragObj:'(//img[@id="img1"])[1]',
  },
  spinner:{
        bs5Spinner: '//a[text()="BS5 Spinners"]',
        loader:'span.spinner-grow-sm'
  },
  dropDown:{
        bs5Select: '//a[text()="BS5 Select Menus"]',
        dropDownField:'select#sel1'
  },
  checkBox: {
    bs5CheckBox:'//a[text()="BS5 Checks and Radios"]',
    radiobtn1:'//input[@id="radio1"]',
    radiobtn2:'//input[@id="radio2"]',
    radiobtn3:'//input[@id="radio3"]'

  },
  // define test Styles for bootstrap color
  textStyles : [
    { 
      selector: 'p.text-muted',
      color: 'rgb(108, 117, 125)',
      text: 'This text is muted.'
    },
    {
      selector: 'p.text-primary',
      color: 'rgb(13, 110, 253)',
      text: 'This text is important.'
    },
    {
      selector: 'p.text-success',
      color: 'rgb(25, 135, 84)',
      text: 'This text indicates success.'
    },
    {
      selector: 'p.text-info',
      color: 'rgb(13, 202, 240)',
      text: 'This text represents some information.'
    },
    {
      selector: 'p.text-warning',
      color: 'rgb(255, 193, 7)',
      text: 'This text represents a warning.'
    },
    {
      selector: 'p.text-danger',
      color: 'rgb(220, 53, 69)',
      text: 'This text represents danger.'
    },
    {
      selector: 'p.text-secondary',
      color: 'rgb(108, 117, 125)',
      text: 'Secondary text.'
    },
    {
      selector: 'p.text-dark',
      color: 'rgb(33, 37, 41)',
      text: 'Dark grey text.'
    },
    {
      selector: 'p.text-body',
      color: 'rgb(33, 37, 41)',
      text: 'Body text.'
    },
    {
      selector: 'p.text-light',
      color: 'rgb(248, 249, 250)',
      text: 'Light grey text.'
    }
  ]
};