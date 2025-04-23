import React, {  createRef, FC,Component, useEffect, useState, useCallback, useContext } from "react";
import Svg, {
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { ThemeContext } from '../../../Contexts/theme-context';
const SpotifySVG = (props) => {
  const { theme, deep, sport, dark} = useContext(ThemeContext);
  return(
    <Svg
    width={31}
    height={30}
    viewBox="0 0 31 30"
    fill="none"
    {...props}
  >
    <Ellipse
      cx={15.5}
      cy={15}
      rx={15.375}
      ry={14.25}
      fill="url(#paint0_linear_1337_2235)"
    />
    <Path
      d="M23.7159 13.467C19.0745 10.8963 11.4185 10.66 6.98779 11.9143C6.2763 12.1155 5.52388 11.7409 5.30827 11.0774C5.09265 10.4135 5.49396 9.71225 6.20597 9.51052C11.2922 8.07052 19.7473 8.34874 25.0906 11.3068C25.7306 11.6611 25.9405 12.4319 25.5612 13.0278C25.1815 13.6246 24.3543 13.8214 23.7159 13.467ZM23.5639 17.2745C23.2383 17.7673 22.5474 17.9218 22.0197 17.6192C18.1502 15.401 12.2497 14.7585 7.67177 16.0543C7.07806 16.2217 6.45099 15.9095 6.27079 15.3569C6.0918 14.8032 6.42674 14.2195 7.01925 14.0512C12.249 12.5712 18.7503 13.288 23.1946 15.8351C23.7223 16.1382 23.8884 16.783 23.5639 17.2745ZM21.802 20.9311C21.5433 21.3268 20.9908 21.4508 20.568 21.2096C17.1866 19.2823 12.9308 18.8471 7.91868 19.9147C7.43569 20.018 6.95443 19.7358 6.84422 19.2853C6.73366 18.8351 7.03507 18.3861 7.51926 18.2833C13.004 17.114 17.709 17.6172 21.5042 19.78C21.9274 20.0211 22.0606 20.5366 21.802 20.9311Z"
      fill={theme.backgroundColor}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1337_2235"
        x1={0.068894}
        y1={14.7615}
        x2={30.7103}
        y2={14.7615}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.spotifyG1} />
        <Stop offset={1} stopColor={theme.spotifyG2}/>
      </LinearGradient>
    </Defs>
  </Svg>
);

};

export default SpotifySVG;
