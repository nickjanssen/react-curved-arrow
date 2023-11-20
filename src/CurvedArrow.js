import React from "react";

function bezier(p0, p1, p2, t) {
  return p1 + (1 - t) * (1 - t) * (p0 - p1) + t * t * (p2 - p1);
}
// We find local min/maxes by looking at the
// roots of the derivative of bezier(t)
// b'(t) = 2 * (1 - t)(p1 - p0) + 2 * t (p2 - p1)
// b'(t) = 0 when t = (p0 - p1) / (p0 - 2 * p1 + p2)
// which exists if the divisor isn't equal to 0
function quadraticCurveMinMax(p0, p1, p2) {
  let min = Math.min(p0, p2);
  let max = Math.max(p0, p2);
  if (p0 - 2 * p1 + p2 !== 0) {
    let t = (p0 - p1) / (p0 - 2 * p1 + p2)
    if (t > 0 && t < 1) {
      let p_middle = bezier(p0, p1, p2, t);
      min = Math.min(min, p_middle);
      max = Math.max(max, p_middle);
    }
  }
  return [Math.round(min), Math.round(max)];
}
function isServerSide() {
  return typeof window === 'undefined'
}

class CurvedArrow extends React.PureComponent {
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  render() {
    const {
      fromSelector = "body",
      toSelector = fromSelector,
      fromOffsetX = 0,
      fromOffsetY = 0,
      toOffsetX = 0,
      toOffsetY = 0,
      middleX = 0,
      middleY = 0,
      width = 8,
      color = "black",
      hideUnderWidth = 0,
      hideIfFoundSelector,
      debugLine = false,
      dynamicUpdate = false,
      zIndex = 0
    } = this.props;
    
    if (isServerSide()) { return null }

    const fromElement = document.querySelector(fromSelector);
    const toElement = document.querySelector(toSelector);

    if (this.timer) clearTimeout(this.timer);

    if (dynamicUpdate || (!fromElement || !toElement)) {
      this.timer = setTimeout(() => {
        this.forceUpdate();
      }, 200);
    }

    if (!fromElement || !toElement) {
      return null;
    }

    if (hideIfFoundSelector) {
      if (document.querySelector(hideIfFoundSelector)) return null;
    }

    let rect;
    rect = fromElement.getBoundingClientRect();
    const p0x = rect.left + rect.width / 2 + fromOffsetX;
    const p0y = rect.top + rect.height / 2 - fromOffsetY + window.scrollY;

    rect = toElement.getBoundingClientRect();
    const p2x = rect.left + rect.width / 2 + toOffsetX;
    const p2y = rect.top + rect.height / 2 - toOffsetY + window.scrollY;

    const p1x = (p0x + p2x) / 2 + middleX;
    const p1y = (p0y + p2y) / 2 - middleY;

    var settings = {
      p0x,
      p0y,
      p1x,
      p1y,
      p2x,
      p2y,
      size: 30,
      lineWidth: width,
      strokeStyle: color
    };

    const style = { ...this.props.style };

    return (
      <canvas
        ref={c => {
          const canvas = c;
          if (!canvas) return;

          var x_min_max = quadraticCurveMinMax(
            settings.p0x,
            settings.p1x,
            settings.p2x
          );

          var y_min_max = quadraticCurveMinMax(
            settings.p0y,
            settings.p1y,
            settings.p2y
          );

          var padding = settings.size - settings.lineWidth;

          var x_min = x_min_max[0] - padding;
          var x_max = x_min_max[1] + padding;
          var y_min = y_min_max[0] - padding;
          var y_max = y_min_max[1] + padding;

          var p0x = settings.p0x - x_min;
          var p0y = settings.p0y - y_min;
          var p1x = settings.p1x - x_min;
          var p1y = settings.p1y - y_min;
          var p2x = settings.p2x - x_min;
          var p2y = settings.p2y - y_min;

          canvas.style.position = "absolute";
          canvas.style.pointerEvents = "none";
          canvas.style.top = y_min + "px";
          canvas.style.left = x_min + "px";
          canvas.width = x_max - x_min;
          canvas.height = y_max - y_min;

          if (hideUnderWidth > 0) {
            if (window.matchMedia(`(max-width: ${hideUnderWidth}px)`).matches) {
              canvas.style.display = "none";
            } else {
              canvas.style.display = "inline-block";
            }
          }

          if (zIndex) {
            canvas.style.zIndex = zIndex;
          }

          var ctx = canvas.getContext("2d");

          if (debugLine) {
            ctx.arc(p0x, p0y, 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.arc(p1x, p1y, 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.arc(p2x, p2y, 10, 0, 2 * Math.PI);
            ctx.stroke();
          }

          // Styling
          ctx.strokeStyle = settings.strokeStyle;
          ctx.lineWidth = settings.lineWidth;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          // Arrow body
          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.quadraticCurveTo(p1x, p1y, p2x, p2y);
          ctx.stroke();

          // Arrow head
          var angle = Math.atan2(p2y - p1y, p2x - p1x);
          ctx.translate(p2x, p2y);

          // Right side
          ctx.rotate(angle + 1);
          ctx.beginPath();
          ctx.moveTo(0, settings.size);
          ctx.lineTo(0, 0);
          ctx.stroke();

          // Left side
          ctx.rotate(-2);
          ctx.lineTo(0, -settings.size);
          ctx.stroke();

          // Restore context
          ctx.rotate(1 - angle);
          ctx.translate(-p2x, -p2y);
        }}
      />
    );
  }
}

export default CurvedArrow;
