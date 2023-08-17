import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { privateRequest } from '../../configs/RequestMethod';
import { useParams } from 'react-router-dom';

const UpdateSubject = () => {
  const [image, setImage] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectDescription, setSubjectDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getSingleSubject = async () => {
      try {
        const response = await privateRequest.get(`/study/subject/${id}`);
        const subjectData = response.data.data;

        setSubjectId(subjectData._id);
        setSubjectName(subjectData.subjectName);
        setSubjectDescription(subjectData.subjectDescription);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleSubject();
  }, [id]);

  const submitImage = async () => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'dakshin_murti');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        const result = await response.json();

        const payload = {
          subjectName: subjectName,
          subjectDescription: subjectDescription,
          subjectImg: result.secure_url,
        };

        try {
          const updateResponse = await privateRequest.put(
            `/study/subject/${subjectId}`,
            payload
          );
          console.log(updateResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitImage();

    setSubjectName('');
    setSubjectDescription('');
    setImage(null);
  };

  return (
    <div>
      <Navbar title={'Update Subject'} />
      <Sidebar />

      <div className="w-full max-w-xl m-auto mt-8 ">
        <form
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject Description"
              value={subjectDescription}
              onChange={(e) => setSubjectDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-8 justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {image && (
              <div>
                <img
                  className="max-h-[9rem] object-contain"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubject;
