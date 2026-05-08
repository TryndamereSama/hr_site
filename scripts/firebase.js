// MC1 HUB — Firebase Configuration
//
// ─── SETUP (one-time, ~5 min) ────────────────────────────────────────────────
// 1. Acesse https://console.firebase.google.com/
// 2. "Adicionar projeto" → nome (ex: mc1-hr-hub) → Continuar → Criar projeto
// 3. Engrenagem → Configurações do projeto → Seus aplicativos → ícone Web (</>)
//    Registrar app → copie os valores de firebaseConfig abaixo
// 4. Authentication → Método de login → Google → Ativar → Salvar
// 5. Authentication → Settings → Domínios autorizados → adicionar domínio de produção
// 6. Firestore Database → Criar banco de dados → Modo produção → escolher região
// 7. Firestore → Regras → colar conteúdo de firestore.rules → Publicar
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth }        from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ⚠️  Substitua TODOS os "REPLACE_ME" com os valores do seu projeto Firebase
// Firebase Console → Configurações do projeto → Seus aplicativos → Web → SDK snippet → Config
const _config = {
  apiKey:            'AIzaSyAaNfqoqp5jnVtUpCaDQnUgxHEfS8qRzyA',
  authDomain:        'mc1-hub.firebaseapp.com',
  projectId:         'mc1-hub',
  storageBucket:     'mc1-hub.firebasestorage.app',
  messagingSenderId: '918770067784',
  appId:             '1:918770067784:web:451f4a3a00a2efda752b7d',
};

export const FIREBASE_CONFIGURED = _config.apiKey !== 'REPLACE_ME';

let _app = null, _db = null, _auth = null;

if (FIREBASE_CONFIGURED) {
  try {
    _app  = initializeApp(_config);
    _db   = getFirestore(_app);
    _auth = getAuth(_app);
  } catch (e) {
    console.error('[Firebase] Falha na inicialização:', e.message);
  }
}

export const app  = _app;
export const db   = _db;
export const auth = _auth;
