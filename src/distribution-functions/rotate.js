function rotate(count, options){'use strict';
  count = count || 1;
  options  = options || {};
  const COMPANG = 0.5; // Complementary Angle
  let
  defaults = {
    length: 0.1,
    invert: false,
  },
  points = [],
  complementary = true,
  currAng = 0,
  nextAng;

  // Set default options if not defined;
  options.length = options.length || defaults.length;
  options.invert = options.invert || defaults.invert;

  if(options.invert){
    options.length = -options.length;
  }

  for(let ii = 0; ii < count; ii++){
    points.push(currAng);
    nextAng = complementary ? COMPANG : options.length;
    complementary = !complementary;
    currAng += nextAng;
    if(currAng > 1){
      currAng -= 1;
    }
  }

  return points;
}

module.exports = rotate;
