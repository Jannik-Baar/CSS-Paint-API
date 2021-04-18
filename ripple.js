class Ripple {
  static get inputProperties() { 
    return ['--ripple-color', '--animation-tick', '--ripple-x', '--ripple-y'];
  }

  paint(ctx, geom, properties) {
    const rippleColor = properties.get('--ripple-color').toString();
    const x = parseFloat(properties.get('--ripple-x').toString());
    const y = parseFloat(properties.get('--ripple-y').toString());
    let tick = parseFloat(properties.get('--animation-tick').toString());
    if (tick < 0) {
      tick = 0;
    } else if (tick > 1000) {
      tick = 1000;
    }

    ctx.fillStyle = rippleColor;
    ctx.globalAlpha = 1 - tick / 1000;
    ctx.arc(
      x, y, // coordinates of the arc's center
      geom.width * tick / 1000, // radius
      0, // startAngle
      2 * Math.PI //endAngle
    ); // adds a circular arc to the current sub-path.
    ctx.fill(); // fills the current or given path with the current fillStyle
  }
}

registerPaint('ripple', Ripple);
