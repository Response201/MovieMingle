// src/global.d.ts

declare module 'google' {
    interface GoogleMaps {
      version: string;
      map: google.maps.Map | null; // Adjust with the correct type if available
      // Add more properties and methods as needed
    }
  
    export function maps(): GoogleMaps;
  }