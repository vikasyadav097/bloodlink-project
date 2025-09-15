const API_BASE = "http://localhost:3001/api";

// helper: GET
async function apiGet(url){
  const res = await fetch(API_BASE + url);
  return res.json();
}

// helper: POST
async function apiPost(url, data){
  const res = await fetch(API_BASE + url, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
}

// auth
async function registerUser(data){ return apiPost("/auth/register", data); }
async function loginUser(data){ 
  const res = await apiPost("/auth/login", data);
  if(res.user) localStorage.setItem("user", JSON.stringify(res.user));
  return res;
}

// stock
async function getStock(){ return apiGet("/stock"); }
async function searchStock(group){ return apiGet("/stock/search?group="+encodeURIComponent(group)); }

// requests
async function createRequest(data){ return apiPost("/requests", data); }
async function getRequests(){ return apiGet("/requests"); }

// collection
async function addCollection(data){ return apiPost("/collection", data); }

// camps
async function getCamps(){ return apiGet("/camps"); }
async function addCamp(data){ return apiPost("/camps", data); }

// feedback & complaint
async function sendFeedback(data){ return apiPost("/feedback", data); }
async function sendComplaint(data){ return apiPost("/complaint", data); }

// current logged in user
function getUser(){ return JSON.parse(localStorage.getItem("user")||"null"); }
function logout(){ localStorage.removeItem("user"); }
