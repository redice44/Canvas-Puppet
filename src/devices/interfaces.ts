import * as Puppeteer from 'puppeteer';

export interface Screenshot {
  coursePath: string,
  sectionPath: string,
  uniquePath: string
};

export interface Device {
  name: string,
  device: Puppeteer.EmulateOptions
}

export interface DeviceList {
  screenshot: Screenshot,
  devices: Device[]
}
