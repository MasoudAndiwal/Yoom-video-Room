const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Get app version
  getAppVersion: () => ipcRenderer.invoke('app-version'),
  // Add any other functions you need to expose to the renderer
});

// Add any initialization code needed
window.addEventListener('DOMContentLoaded', () => {
  // Add any DOM initialization code here
  console.log('Preload script has loaded');
});
