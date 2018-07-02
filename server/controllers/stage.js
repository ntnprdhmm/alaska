const get = (req, res) => {
  return res.json({ stages: [
    {
      start: process.env.STAGE_1_START,
      end: process.env.STAGE_1_END
    },
    {
      start: process.env.STAGE_2_START,
      end: process.env.STAGE_2_END
    },
    {
      start: process.env.STAGE_3_START,
      end: process.env.STAGE_3_END
    }
  ]})
}

module.exports = { get }
