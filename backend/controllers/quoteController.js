const Quote = require("../models/Quote");
const Job = require("../models/Job");

const submitQuote = async (req, res) => {
  try {
    const { jobId, price, message, estimatedTime } = req.body;
    const quote = await Quote.create({
      job: jobId,
      contractor: req.user._id,
      price,
      message,
      estimatedTime,
    });
    await Job.findByIdAndUpdate(jobId, { status: "quoted" });
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuotesForJob = async (req, res) => {
  try {
    const quotes = await Quote.find({ job: req.params.jobId }).populate(
      "contractor",
      "name businessName rating location"
    );
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    quote.status = "accepted";
    await quote.save();

    await Job.findByIdAndUpdate(quote.job, {
      status: "accepted",
      acceptedContractor: quote.contractor,
    });

    await Quote.updateMany(
      { job: quote.job, _id: { $ne: quote._id } },
      { status: "rejected" }
    );

    res.json({ message: "Quote accepted successfully", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitQuote, getQuotesForJob, acceptQuote };
