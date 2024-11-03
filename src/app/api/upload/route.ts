import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the file' });
    }

    const filePath = files.file.filepath;
    const fileStream = fs.createReadStream(filePath);

    // Send the file to JupyterLab in Step 2
    const notebookUrl = 'https://jupyter-batch-us-region-1.cloud.intel.com/user/u547166113329527215758602233ea16/Gaudi';
    const apiToken = 'YOUR_JUPYTER_API_TOKEN';  // Replace with your actual token

    export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
        return res.status(500).json({ message: 'Error parsing the file' });
        }

        const filePath = files.file.filepath;
        const fileStream = fs.createReadStream(filePath);

        try {
        const uploadResponse = await fetch(
            `${notebookUrl}/api/contents/Gaudi-tutorials/PyTorch/Single_card_tutorials/${files.file.originalFilename}?token=${apiToken}`,
            {
            method: 'PUT',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: fileStream
            }
        );

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload to Jupyter');
        }

        res.status(200).json({ message: 'File uploaded to JupyterLab successfully' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file to JupyterLab' });
        }
    });
    }

    
    // Placeholder response until Step 2 is implemented
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  });
}
