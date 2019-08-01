const express = require('express')
const xss = require('xss')
const path = require('path');
const fs = require('fs');
const AnimationsService = require('./animations-service')

const animationsRouter = express.Router()
const bodyParser = express.json({
  limit: '1000000k'
})

animationsRouter
  .route('/')
  .get((req, res, next) => {
    AnimationsService.getAllFiles(req.app.get('db'))
      .then(icons => {
        res.json(icons.map(icon => ({
          id: icon.id,
          json: icon.json
        })))
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    const { lottieColor, duration, stroke, scale } = req.body


    function editJSON(file, lottieColor, scale, stroke, duration) {
    // Event Handler + POST request
        file.op = 30;
        let strokeAdjusted = stroke.replace('pt', '')*20
        let height = parseInt(scale.replace('px', ''))
        let outputheight = ((height/24)*100).toFixed(2)
        let jsonsize = [outputheight, outputheight, 100]
        let durationAdjusted = duration.replace('ms','')
        let framerate = parseFloat(((file.op/duration)*1000), 10);

        let lottieFramerate = Math.round(framerate * 1e2) / 1e2;

        file.fr = lottieFramerate;
        file.layers[0].ks['s'].k = jsonsize;
        file.h = height;
        file.w = height;

        // Current JSON paths:
      switch (file.nm) {
      case 'Alarm_Clock_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[3].c.k = lottieColor;
        file.layers[4].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[3].w.k = strokeAdjusted;
        file.layers[4].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Arrow_BottomLeft_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_BottomRight_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_Down_Build':
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_Left_Build':
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_Right_Build':
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_TopLeft_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_TopRight_Build':

        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Arrow_Up_Build':
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Attach_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Audio_Build':
        file.layers[1].shapes[5].c.k = lottieColor;
        file.layers[1].shapes[5].w.k = strokeAdjusted;
        break;
      case 'Battery_0_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Battery_25_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Battery_50_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Battery_75_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[4].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        file.layers[4].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Battery_100_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[4].shapes[2].c.k = lottieColor;
        file.layers[5].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        file.layers[4].shapes[2].w.k = strokeAdjusted;
        file.layers[5].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Battery_Charging_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Bookmark_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Calendar_Build':
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[4].shapes[1].c.k = lottieColor;
        file.layers[5].shapes[1].c.k = lottieColor;
        file.layers[6].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[4].shapes[1].w.k = strokeAdjusted;
        file.layers[5].shapes[1].w.k = strokeAdjusted;
        file.layers[6].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Camera_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].it[2].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[1].shapes[1].it[1].w.k = strokeAdjusted;
        file.layers[1].shapes[2].it[2].w.k = strokeAdjusted;
        break;
      case 'Cart_Add_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].it[1].c.k = lottieColor;
        file.layers[2].shapes[2].it[1].c.k = lottieColor;
        file.layers[2].shapes[3].it[1].c.k = lottieColor;
        file.layers[2].shapes[6].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[6].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Cart_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].it[1].c.k = lottieColor;
        file.layers[1].shapes[3].it[1].c.k = lottieColor;
        file.layers[1].shapes[7].c.k = lottieColor;
        file.layers[1].shapes[7].w.k = strokeAdjusted;
        break;
      case 'Cast_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Check_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Chevron_Down_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Chevron_Left_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted
        break;
      case 'Chevrons_Left_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Chevron_Right_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Chevrons_Right_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Chevron_Up_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Cloud_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'DirectionalPad_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Document_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Dots_Horizontal_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[2].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[2].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Dots_Vertical_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[2].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[2].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Download_Alternate_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Download_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Edit_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[6].shapes[8].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[6].shapes[8].w.k = strokeAdjusted;
        break;
      case 'Eye_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Eye_Off_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Folder_Add_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[4].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[4].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Folder_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Garbage_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].it[1].c.k = lottieColor;
        file.layers[1].shapes[3].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[1].shapes[1].it[1].w.k = strokeAdjusted;
        file.layers[1].shapes[2].it[1].w.k = strokeAdjusted;
        file.layers[1].shapes[3].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Heart_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Home_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Image_Add_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[1].it[1].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[4].shapes[2].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        file.layers[4].shapes[2].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Image_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'ImageGallery_Build':
        file.layers[1].shapes[3].c.k = lottieColor;
        file.layers[1].shapes[4].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[3].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Info_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Laptop_Build':
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Link_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Lock_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Mail_Build':
        file.layers[2].shapes[0].it[2].c.k = lottieColor;
        file.layers[3].shapes[0].it[2].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[6].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[6].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Maximize_Build':
        file.layers[1].shapes[4].c.k = lottieColor;
        file.layers[1].shapes[4].w.k = strokeAdjusted;
        break;
      case 'Menu_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Microphone_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Microphone_Off_Build':
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Minimize_Build':
        file.layers[1].shapes[4].c.k = lottieColor;
        file.layers[1].shapes[4].w.k = strokeAdjusted;
        break;
      case 'Minus_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Notifications_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Pause_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Pencil_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Phone_Build':
        file.layers[2].shapes[0].it[1].c.k  = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k  = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Pin_Build':
        file.layers[2].shapes[1].c.k  = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[2].c.k = lottieColor;
        file.layers[4].shapes[1].c.k  = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[2].w.k = strokeAdjusted;
        file.layers[4].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Play_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Playlist_Add_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Playlist_Added_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Playlist_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Plus_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Power_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Printer_Build':
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[6].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[6].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Redo_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Refresh_Build':
        file.layers[1].shapes[0].it[1].c.k  = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Repeat_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[7].shapes[0].it[1].c.k = lottieColor;
        file.layers[8].shapes[0].it[1].c.k = lottieColor;
        file.layers[9].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[7].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[8].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[9].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Repeat_One_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[6].shapes[0].it[1].c.k = lottieColor;
        file.layers[8].shapes[0].it[1].c.k = lottieColor;
        file.layers[9].shapes[0].it[1].c.k = lottieColor;
        file.layers[10].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[6].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[8].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[9].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[10].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Search_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Settings_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Share_Build':
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[4].shapes[1].c.k = lottieColor;
        file.layers[5].shapes[1].c.k = lottieColor;
        file.layers[6].shapes[1].c.k = lottieColor;
        file.layers[7].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        file.layers[4].shapes[1].w.k = strokeAdjusted;
        file.layers[5].shapes[1].w.k = strokeAdjusted;
        file.layers[6].shapes[1].w.k = strokeAdjusted;
        file.layers[7].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Shuffle_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[0].it[1].c.k = lottieColor;
        file.layers[5].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[5].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Skip_Backward_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Skip_Forward_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Star_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Statistics_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Statistics_Alternate_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Stop_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Sync_Build':
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[1].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[1].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].it[1].w.k = strokeAdjusted;
        break;
      case 'Target_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Undo_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Unlock_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[2].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[2].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Upload_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[2].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[2].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'User_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Video_Add_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[4].shapes[2].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[4].shapes[2].w.k = strokeAdjusted;
        break;
      case 'Video_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'VideoGallery_Build':
        file.layers[1].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[2].c.k = lottieColor;
        file.layers[2].shapes[0].it[1].c.k = lottieColor;
        file.layers[3].shapes[0].it[1].c.k = lottieColor;
        file.layers[1].shapes[0].it[1].w.k = strokeAdjusted;
        // file.layers[1].shapes[0].it[2].w.k
        file.layers[2].shapes[0].it[1].w.k = strokeAdjusted;
        file.layers[3].shapes[0].it[1].w.k = strokeAdjusted;
        break;
      case 'Volume_High_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Volume_Low_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Volume_Mute_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'X_Build':
        file.layers[1].shapes[1].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[1].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Zoom_In_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[3].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        file.layers[3].shapes[1].w.k = strokeAdjusted;
        break;
      case 'Zoom_Out_Build':
        file.layers[1].shapes[2].c.k = lottieColor;
        file.layers[2].shapes[1].c.k = lottieColor;
        file.layers[1].shapes[2].w.k = strokeAdjusted;
        file.layers[2].shapes[1].w.k = strokeAdjusted;
        break;
      default:

     return file
  }
}
    AnimationsService.getAllFiles(req.app.get('db'))
      .then(icons => {

        const animations = []
        icons.map(icon => {
          animations.push(
            {
              id: icon.id,
              name: icon.file.nm,
              file: icon.file,
            }

          )
          animations.forEach(json => {
            editJSON(json.file, lottieColor, scale, stroke, duration)
          })
        })

        res.json(animations)
      })
      .catch(next)


  })


animationsRouter
  .route('/:animation_id')
  .all((req, res, next) => {
    AnimationsService.getById(
      req.app.get('db'),
      req.params.animation_id
    )
    .then(file => {
      if (!file) {
        return res
          .status(404)
          .json({
            error: { message: `Post doesn't exist`}
          })
      }
      res.file = file
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    AnimationsService.getById(
      req.app.get('db'),
      req.params.animation_id
    )
    .then(file => {
      if (!file) {
        return res
          .status(404)
          .json({
            error: { message: `File doesn't exist` }
          })
      }
      res.json(file)
    })
    .catch(next)
  })

module.exports = animationsRouter
