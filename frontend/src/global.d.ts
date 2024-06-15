// src/global.d.ts

declare module 'google' {
    interface GoogleMaps {
      version: string;
      map: google.maps.Map | null;
  
    }
  
    export function maps(): GoogleMaps;
  }