import React, { useState } from ‘react’;
import { LogOut, Settings, MessageSquare, Shield, Zap, Eye, EyeOff, Plus, Copy, Trash2, Save } from ‘lucide-react’;

export default function RekiiDashboard() {
const [loggedIn, setLoggedIn] = useState(false);
const [username, setUsername] = useState(’’);
const [password, setPassword] = useState(’’);
const [loginError, setLoginError] = useState(’’);
const [currentUser, setCurrentUser] = useState(null);
const [activeTab, setActiveTab] = useState(‘status’);
const [showPassword, setShowPassword] = useState(false);

// Bot Status State
const [botStatus, setBotStatus] = useState(‘online’);
const [statusMessage, setStatusMessage] = useState(‘🎮 Rekii Bot Active’);

// Moderation Settings
const [modSettings, setModSettings] = useState({
automod: true,
antiSpam: true,
antiRaid: true,
logChannel: ‘#mod-logs’,
muteRole: ‘@Muted’
});

// Embed Creator State
const [embedData, setEmbedData] = useState({
title: ‘Willkommen zu Rekii’,
description: ‘Dies ist ein Test Embed’,
color: ‘#FF0000’,
footer: ‘Rekii Bot’,
fields: []
});

// User Database
const VALID_USERS = {
‘admin’: ‘rekii123’,
‘owner’: ‘owner2025’
};

const handleLogin = () => {
if (VALID_USERS[username] === password) {
setLoggedIn(true);
setCurrentUser(username);
setLoginError(’’);
setUsername(’’);
setPassword(’’);
} else {
setLoginError(‘Ungültige Anmeldedaten’);
}
};

const handleLogout = () => {
setLoggedIn(false);
setCurrentUser(null);
};

const updateBotStatus = (status) => {
setBotStatus(status);
};

const updateModSetting = (key, value) => {
setModSettings(prev => ({ …prev, [key]: value }));
};

const updateEmbedField = (key, value) => {
setEmbedData(prev => ({ …prev, [key]: value }));
};

const addEmbedField = () => {
setEmbedData(prev => ({
…prev,
fields: […prev.fields, { name: ‘Feldname’, value: ‘Feldwert’ }]
}));
};

const removeEmbedField = (index) => {
setEmbedData(prev => ({
…prev,
fields: prev.fields.filter((_, i) => i !== index)
}));
};

const updateEmbedField_item = (index, key, value) => {
setEmbedData(prev => ({
…prev,
fields: prev.fields.map((f, i) => i === index ? { …f, [key]: value } : f)
}));
};

const copyEmbedJSON = () => {
const json = JSON.stringify(embedData, null, 2);
navigator.clipboard.writeText(json);
alert(‘Embed JSON kopiert!’);
};

// LOGIN SCREEN
if (!loggedIn) {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
<div className="w-full max-w-md">
<div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-8">
<div className="text-center mb-8">
<h1 className="text-4xl font-bold text-white">
Rekii
</h1>
<p className="text-gray-400 mt-2">Bot Dashboard</p>
</div>

```
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Passwort
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 text-red-400 text-sm">
              {loginError}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Anmelden
          </button>
        </div>

        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg text-xs text-slate-400">
          <p className="font-semibold mb-2">Demo Accounts:</p>
          <p>Benutzername: <span className="text-slate-200">admin</span></p>
          <p>Passwort: <span className="text-slate-200">rekii123</span></p>
        </div>
      </div>
    </div>
  </div>
);
```

}

// MAIN DASHBOARD
return (
<div className="min-h-screen bg-slate-900">
<nav className="bg-slate-800 border-b border-slate-700 shadow-lg">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
<h1 className="text-2xl font-bold text-white">
Rekii Dashboard
</h1>
<div className="flex items-center gap-4">
<span className="text-slate-300">👤 {currentUser}</span>
<button
onClick={handleLogout}
className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
>
<LogOut size={18} /> Abmelden
</button>
</div>
</div>
</nav>

```
  <div className="flex">
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
      <div className="p-4 space-y-2">
        <button
          onClick={() => setActiveTab('status')}
          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            activeTab === 'status'
              ? 'bg-red-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Zap size={18} /> Bot Status
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            activeTab === 'moderation'
              ? 'bg-red-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Shield size={18} /> Moderation
        </button>
        <button
          onClick={() => setActiveTab('embed')}
          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            activeTab === 'embed'
              ? 'bg-red-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          <MessageSquare size={18} /> Embed Creator
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            activeTab === 'settings'
              ? 'bg-red-600 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Settings size={18} /> Einstellungen
        </button>
      </div>
    </aside>

    <main className="flex-1 p-8">
      {/* BOT STATUS TAB */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Bot Status</h2>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Rekii Bot Status ändern</h3>
            <div className="flex gap-3 flex-wrap">
              {['online', 'idle', 'dnd', 'offline'].map(status => (
                <button
                  key={status}
                  onClick={() => updateBotStatus(status)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    botStatus === status
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {status === 'online' && '🟢'} {status === 'idle' && '🟡'} {status === 'dnd' && '🔴'} {status === 'offline' && '⚫'} {status}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Status Nachricht</h3>
            <input
              type="text"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              placeholder="z.B. 🎮 Rekii Bot Active"
            />
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Bot Informationen</h3>
            <div className="space-y-2 text-slate-300">
              <p>📊 Status: <span className="text-white font-semibold">{botStatus}</span></p>
              <p>💬 Nachricht: <span className="text-white font-semibold">{statusMessage}</span></p>
              <p>✅ Bot läuft: <span className="text-green-400 font-semibold">Aktiv</span></p>
            </div>
          </div>
        </div>
      )}

      {/* MODERATION TAB */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Moderation Einstellungen</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold">Auto-Mod</label>
                <input
                  type="checkbox"
                  checked={modSettings.automod}
                  onChange={(e) => updateModSetting('automod', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p className="text-slate-400 text-sm">Automatische Moderation für verbotene Wörter</p>
            </div>

            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold">Anti-Spam</label>
                <input
                  type="checkbox"
                  checked={modSettings.antiSpam}
                  onChange={(e) => updateModSetting('antiSpam', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p className="text-slate-400 text-sm">Verhindert Spam Nachrichten</p>
            </div>

            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-semibold">Anti-Raid</label>
                <input
                  type="checkbox"
                  checked={modSettings.antiRaid}
                  onChange={(e) => updateModSetting('antiRaid', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p className="text-slate-400 text-sm">Schützt vor Raid-Attacken</p>
            </div>

            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <label className="block text-white font-semibold mb-3">Log Channel</label>
              <input
                type="text"
                value={modSettings.logChannel}
                onChange={(e) => updateModSetting('logChannel', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <label className="block text-white font-semibold mb-3">Mute Role</label>
              <input
                type="text"
                value={modSettings.muteRole}
                onChange={(e) => updateModSetting('muteRole', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2">
            <Save size={18} /> Änderungen speichern
          </button>
        </div>
      )}

      {/* EMBED CREATOR TAB */}
      {activeTab === 'embed' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Embed Creator</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <label className="block text-white font-semibold mb-2">Titel</label>
                <input
                  type="text"
                  value={embedData.title}
                  onChange={(e) => updateEmbedField('title', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <label className="block text-white font-semibold mb-2">Beschreibung</label>
                <textarea
                  value={embedData.description}
                  onChange={(e) => updateEmbedField('description', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500 h-24"
                />
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <label className="block text-white font-semibold mb-2">Farbe (Hex)</label>
                <input
                  type="text"
                  value={embedData.color}
                  onChange={(e) => updateEmbedField('color', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="#FF0000"
                />
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <label className="block text-white font-semibold mb-2">Footer</label>
                <input
                  type="text"
                  value={embedData.footer}
                  onChange={(e) => updateEmbedField('footer', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={addEmbedField}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Feld hinzufügen
                </button>
              </div>

              {embedData.fields.map((field, idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-400 text-sm">Feld {idx + 1}</span>
                    <button
                      onClick={() => removeEmbedField(idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateEmbedField_item(idx, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500 mb-2"
                    placeholder="Feldname"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateEmbedField_item(idx, 'value', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                    placeholder="Feldwert"
                  />
                </div>
              ))}

              <button
                onClick={copyEmbedJSON}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Copy size={18} /> JSON kopieren
              </button>
            </div>

            {/* Preview */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 h-fit">
              <h3 className="text-slate-400 text-sm font-semibold mb-4">Vorschau</h3>
              <div
                className="rounded-lg p-4 text-white"
                style={{ borderLeft: `4px solid ${embedData.color}`, backgroundColor: '#2d3748' }}
              >
                <h4 className="text-lg font-bold mb-2">{embedData.title}</h4>
                <p className="text-sm mb-4">{embedData.description}</p>
                {embedData.fields.map((field, idx) => (
                  <div key={idx} className="mb-3">
                    <p className="font-semibold text-sm">{field.name}</p>
                    <p className="text-sm text-slate-300">{field.value}</p>
                  </div>
                ))}
                <div className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-600">
                  {embedData.footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Bot Einstellungen</h2>

          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 max-w-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">Rekii Bot Konfiguration</h3>
            <div className="space-y-4 text-slate-300">
              <p>🤖 <span className="font-semibold">Bot Name:</span> Rekii</p>
              <p>🔑 <span className="font-semibold">Token Status:</span> <span className="text-green-400">Verbunden</span></p>
              <p>📡 <span className="font-semibold">Guilds:</span> 25</p>
              <p>👥 <span className="font-semibold">Mitglieder:</span> 5,240</p>
              <p>⚙️ <span className="font-semibold">Version:</span> 2.0.0</p>
            </div>
          </div>

          <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 px-6 rounded-lg">
            Alle Einstellungen speichern
          </button>
        </div>
      )}
    </main>
  </div>
</div>
```

);
}
