// =============================================
// LINGUA — Auth (Google login, account)
// =============================================
// ---- Auth ----
function openLogin(){document.getElementById('login-modal').classList.add('open');}
function closeLogin(){document.getElementById('login-modal').classList.remove('open');}
async function loginGoogle(){if(!window.FB){showToast(t('firebaseError'),'error');return;}try{const p=new window.FB.GoogleAuthProvider();await window.FB.signInWithRedirect(window.FB.auth,p);}catch(e){showToast(t('googleLoginFailed')+': '+e.message,'error');}}
async function doLogout(){if(window.FB?.signOut)try{await window.FB.signOut(window.FB.auth);}catch(e){}_au=null;_plan='free';_isPro=false;try{localStorage.removeItem(AKEY);}catch(e){}_updateUI();goTo('dashboard');showToast(t('loggedOut'),'info');}
function connectViola(){
  if(!_au){showToast(t('loginRequired'),'error');openLogin();return;}
  showToast(t('violaComingSoon'),'info');
}
async function deleteAccount(){
  if(!_au){showToast(t('loginRequired'),'error');return;}
  if(!confirm(t('deleteAccountConfirm1')))return;
  if(!confirm(t('deleteAccountConfirm2')))return;
  try{
    if(window.FB?.auth?.currentUser)await window.FB.auth.currentUser.delete().catch(()=>{});
    localStorage.clear();
    _au=null;_plan='free';_isPro=false;S=JSON.parse(JSON.stringify(DS));
    _updateUI();showToast(t('deleteAccountDone'),'info');goTo('dashboard');
  }catch(e){showToast(t('deleteAccountFail'),'error');}
}
