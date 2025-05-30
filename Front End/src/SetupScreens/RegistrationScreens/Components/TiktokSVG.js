import React, {  createRef, FC,Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, {
  G,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { ThemeContext } from '../../../Contexts/theme-context';
const TiktokSVG = (props) => {
  const { theme, deep, sport, dark} = useContext(ThemeContext);
  return(
    <Svg
    width={21}
    height={25}
    viewBox="0 0 21 25"
    fill="none"
    {...props}
  >
    <Path
      d="M19.7471 5.8642C18.5461 5.59011 17.4597 4.92822 16.6437 3.97351C15.8277 3.01881 15.3241 1.82037 15.2051 0.550159V0H11.0487V17.0924C11.0496 17.8509 10.8205 18.5903 10.3939 19.2061C9.96727 19.8219 9.36481 20.2827 8.67182 20.5234C7.97882 20.7641 7.23044 20.7723 6.53267 20.547C5.8349 20.3217 5.22312 19.8743 4.78399 19.2681C4.39058 18.7315 4.14968 18.0913 4.08853 17.42C4.02737 16.7487 4.14842 16.0731 4.43796 15.4695C4.72751 14.8659 5.17401 14.3584 5.72697 14.0044C6.27993 13.6504 6.91729 13.464 7.56698 13.4664C7.92629 13.4643 8.2838 13.5191 8.62716 13.6289V9.25268C8.22759 9.20132 7.82493 9.18042 7.42241 9.19016C5.93973 9.23128 4.50078 9.72023 3.28177 10.5972C2.06275 11.4741 1.11659 12.7009 0.55913 14.1274C0.0016731 15.5539 -0.142878 17.1181 0.143177 18.6286C0.429232 20.139 1.13348 21.5301 2.16968 22.6315C3.23165 23.7521 4.59062 24.5198 6.07392 24.8369C7.55721 25.1541 9.09788 25.0065 10.5001 24.4128C11.9024 23.8191 13.103 22.8062 13.9493 21.5028C14.7957 20.1994 15.2495 18.6642 15.2533 17.0924V8.33991C16.9297 9.58271 18.9399 10.2475 21 10.2405V5.98923C20.5953 5.99096 20.1916 5.94906 19.7952 5.8642H19.7471Z"
      fill="url(#paint0_linear_1285_2837)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1285_2837"
        x1={-0.0383163}
        y1={12.2907}
        x2={20.8875}
        y2={12.2907}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.tiktokG1} />
        <Stop offset={1} stopColor={theme.tiktokG2} />
      </LinearGradient>
    </Defs>
  </Svg>
);

};

export default TiktokSVG;
