import { Fonts } from "../fontfamily";
import { font_size } from "../utils/helpers";

const dimens = {
  heading: {
    fontSize: font_size(18),
    lineHeight: font_size(18) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  RoundyRainbows_heading:{
    fontSize: font_size(15),
    lineHeight: font_size(15) * 1.4,
    fontFamily: Fonts.RoundyRainbows,
    fontWeight:'500'
  },
  RoundyRainbows_intro_title_body:{
    fontSize: font_size(13),
    lineHeight: font_size(13) * 1.4,
    fontFamily: Fonts.RoundyRainbows,  
  },
  header_heading: {
    fontSize: font_size(17),
    lineHeight: font_size(17) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  sub_heading: {
    fontSize: font_size(14),
    lineHeight: font_size(14) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  button: {
    fontSize: font_size(14),
    lineHeight: font_size(14) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  Block_body: {
    fontSize: font_size(15),
    lineHeight: font_size(15) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  body: {
    fontSize: font_size(14),
    lineHeight: font_size(14) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  otp_field: {
    fontSize: font_size(14),
    //lineHeight: 15,
 //  fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  intro_title_body: {
    fontSize: font_size(13),
    lineHeight: font_size(13) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  date_text: {
    fontSize: font_size(12),
    lineHeight: font_size(12) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'
  },
  description: {
    fontSize: font_size(11),
    lineHeight: font_size(11) * 1.4,
    fontFamily: Fonts.Medium,
    fontWeight:'500'

  },
  extrasmall: {
    fontSize: font_size(9),
    lineHeight: font_size(9) * 1.4,
    fontFamily: Fonts.Regular,
    fontWeight:'400'

  },
  text_input_error: {
    fontSize: font_size(10),
    lineHeight: font_size(10) * 1.4,
    fontFamily: Fonts.Regular,
    fontWeight:'bold'

  },
};

export { dimens } ;
