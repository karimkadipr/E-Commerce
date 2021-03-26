import express from 'express'
import multer from 'multer'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/carousel/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname} - ${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images Only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), async (req, res) => {
  const image = await sharp(`${req.file.path}`).resize(1800, 765).toBuffer()
  fs.writeFileSync(`${req.file.path}`, image)
  res.send(`/${req.file.path}`)
})

export default router
