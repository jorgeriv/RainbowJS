'use strict';
const Color = require('../src/color');
const Scheme = require('../src/scheme');

// Needed to avoid circular dependencies
require('../src/color-scheme');

describe('Color object', ()=>{

  describe('constructor',()=>{
    it('should create a new color object',()=>{
      let color = new Color();
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
    });

    it('should create and initialize a color object', ()=>{
      let config, color;
      config = {
        name: 'test',
        r: 20,
        g: 120,
        b: 255
      };
      color = new Color(config);
      expect(color.name()).toBe(config.name);
      expect(color.r).toBe(config.r);
      expect(color.g).toBe(config.g);
      expect(color.b).toBe(config.b);
    });

    it('should accepet an hex string as initialization parameter', ()=>{
      let hexString = '#ffffff',
          color = new Color(hexString);

      expect(color.name()).toBe(hexString);
      expect(color.RGB().r).toBe(255);
      expect(color.RGB().g).toBe(255);
      expect(color.RGB().b).toBe(255);
    });

    it('should accepet a css color name as initialization parameter', ()=>{
      let name = 'black',
          color = new Color(name);

      expect(color.name()).toBe(name);
      expect(color.RGB().r).toBe(0);
      expect(color.RGB().g).toBe(0);
      expect(color.RGB().b).toBe(0);
    });
  });// <<< initialization

  describe('update color',()=>{
    let color = new Color();
    // Change color's RGB values
    it('should modify rgb values', ()=>{
      color.RGB(20, 20, 255);
      expect(color.r).toBe(20);
      expect(color.g).toBe(20);
      expect(color.b).toBe(255);
    });

    // Set color's RGB values via hex string
    it('should set hex RGB', ()=>{
      let color = new Color(),
      hrgb = color.hex('ffffff');

      expect(hrgb.r).toBe(255);
      expect(hrgb.g).toBe(255);
      expect(hrgb.b).toBe(255);
    });

    it('should set the color by CSS name', ()=>{
      let color = new Color(),
          rebeccapurple = color.cssName('rebeccapurple');

      expect(rebeccapurple instanceof Object).toBe(true);
      expect(rebeccapurple.hex()).toBe('663399');
    });

    it('should throw when setting an undefined name', ()=>{
      let color = new Color();
      expect(()=>{
        color.cssName('badname');
      }).toThrowError('color badname is not defined');
    });
  });// <<< update color

  describe('get color', ()=>{
    // Get color's HSV values
    it('should get hsv', ()=>{
      let color = new Color(),
          hsv = color.HSV();

      expect(hsv.h).toBe(0);
      expect(hsv.s).toBe(1);
      expect(hsv.v).toBe(1);
    });
    // Get color's Hex RGB values
    it('should get hex string', ()=>{
      let color = new Color();
      let hrgb = color.hex();
      expect(hrgb).toBe('ff0000');
    });
  });// <<< get color

  describe('set individual color values', ()=>{
    // Set color's hue
    it('should set hue value', ()=>{
      let color = new Color(),
      hue = 0.5;
      color.HSV(hue);
      expect(color.HSV().h).toBeCloseTo(hue, 1);
    });

    // Set color's saturation
    it('should set saturation value', ()=>{
      let color = new Color(),
      saturation = 0.5;
      color.HSV(null, saturation);
      expect(color.HSV().s).toBeCloseTo(saturation, 1);
    });

    // Set color's value
    it('should set value value', ()=>{
      let color = new Color(),
      value = 0.5;
      color.HSV(null, null, value);
      expect(color.HSV().v).toBeCloseTo(value, 1);
    });

    it('should rotate hue wheel', ()=>{
      let color = new Color(),
          originalHue = color.HSV().h;
          color.rotateHueWheel(0.1);
      expect(originalHue)
        .toBeLessThan(color.HSV().h);
    });
  });// <<< set individual color vaules



  it('should create a scheme instance from itself', ()=>{
    let color = new Color();
    let scheme = color.createScheme();
    let isInstance = scheme instanceof Scheme;
    expect(isInstance).toBe(true);
  });
  it('should convert object to an object to be stringifyied on JSON.stringify()', ()=>{
    let color = new Color();

    expect(color.toJSON())
    .toEqual({name:undefined,r:255,g:0,b:0});
  });

  it('should clone the color', ()=>{
    let color = new Color(),
        clone = color.clone();

    expect(clone).toEqual(color);
  });

  it('should convert to string when coerced', ()=>{
    let color = new Color();
    expect(''+color).toBe('#ff0000');
  });

});
