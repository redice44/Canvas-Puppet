import * as Puppeteer from 'puppeteer';

export interface Screenshot {
  rootPath: string,
  subPrePath: string,
  subPostPath: string,
  date: string
};

export interface Device {
  name: string,
  device: Puppeteer.EmulateOptions
}

export interface DeviceList {
  screenshot: Screenshot,
  devices: Device[]
}
