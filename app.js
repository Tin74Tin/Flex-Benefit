(function(){
  "use strict";

  /* =========================================================
     SETUP
  ========================================================== */
  function configIsValid(){
    var c = window.SUPABASE_CONFIG || {};
    return !!(c.url && c.anonKey &&
      c.url.indexOf('YOUR-PROJECT-REF') === -1 &&
      c.anonKey.indexOf('YOUR-PUBLIC-ANON-KEY') === -1);
  }

  var supabase = configIsValid()
    ? window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
    : null;

  var CRESCO_LOGO_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAABaCAYAAACFQIIbAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAzEElEQVR4Xu2dCbRVxbH3773wEI1xQmIG56eoiEx5MSbLYBAVh/geGhU1IBqNGUwgODwjcYxjHKLoe/emAAgQEAAAA';

  /* =========================================================
     STATE
  ========================================================== */
  var STATE = {
    loading: true,
    authView: 'login',
    authError: '',
    authInfo: '',
    session: null,
    profile: null,
    activeTab: null,
    profiles: [], benefits: [], rejectReasons: [], claims: [], notifications: [], invites: [],
    toast: null, modal: null,
    rejectingClaimId: null,
    editingClaimId: null,
    confirmDeleteClaimId: null,
    editingAllocId: null,
    confirmDeactivateId: null,
    confirmRevokeInvite: null,
    staffRoleFilter: 'all',
    historyFilter: 'all',
    reportMonth: null, reportYear: null,
    _realtimeSubscribed: false
  };
