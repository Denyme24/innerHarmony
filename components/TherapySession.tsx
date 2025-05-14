import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  instructor: string;
}

interface TherapySessionProps {
  selectedCategories: string[];
  viewType?: 'grid' | 'dashboard';
}

const therapyVideos: Video[] = [
  // Stress Management Videos for Women (10 videos)
  {
    id: 'of6xObz3aK4',  // Therapy in a Nutshell - Panic and Anxiety
    title: 'Managing Stress and Anxiety',
    category: 'Stress',
    thumbnail: `https://img.youtube.com/vi/of6xObz3aK4/maxresdefault.jpg`,
    duration: '15 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'g5sXaLzAhGQ',  // Kati Morton - Stress Management
    title: 'Stress Relief Techniques for Women',
    category: 'Stress',
    thumbnail: `https://img.youtube.com/vi/g5sXaLzAhGQ/maxresdefault.jpg`,
    duration: '20 min',
    instructor: 'Kati Morton'
  },
  
  {
    id: 'QHkXvPq2pQE',  // Therapy in a Nutshell - Leadership
    title: 'Stress Management in Leadership',
    category: 'Stress',
    thumbnail: `https://img.youtube.com/vi/QHkXvPq2pQE/maxresdefault.jpg`,
    duration: '22 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'F28MGLlpP90',  // Kati Morton - Morning Routine
    title: 'Mindful Morning Routine',
    category: 'Stress',
    thumbnail: `https://img.youtube.com/vi/F28MGLlpP90/maxresdefault.jpg`,
    duration: '12 min',
    instructor: 'Kati Morton'
  },
  {
    id: '8TuRYV71Rgo',  // Therapy in a Nutshell - Breathing
    title: 'Breathing Exercises for Stress Relief',
    category: 'Stress',
    thumbnail: `https://img.youtube.com/vi/8TuRYV71Rgo/maxresdefault.jpg`,
    duration: '15 min',
    instructor: 'Emma McAdam'
  },
  

  // Anxiety Management for Women (10 videos)
  
  {
    id: 'bF_1ZiFta-E',  // Kati Morton - Anxiety Relief
    title: 'Anxiety Relief Through Movement',
    category: 'Anxiety',
    thumbnail: `https://img.youtube.com/vi/bF_1ZiFta-E/maxresdefault.jpg`,
    duration: '25 min',
    instructor: 'Kati Morton'
  },
  {
    id: 'vXAr5dh23zU',  // Therapy in a Nutshell - Performance Anxiety
    title: 'Managing Performance Anxiety',
    category: 'Anxiety',
    thumbnail: `https://img.youtube.com/vi/vXAr5dh23zU/maxresdefault.jpg`,
    duration: '15 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'tEmt1Znux58',  // Kati Morton - Relationship Anxiety
    title: 'Overcoming Anxiety in Relationships',
    category: 'Anxiety',
    thumbnail: `https://img.youtube.com/vi/tEmt1Znux58/maxresdefault.jpg`,
    duration: '28 min',
    instructor: 'Kati Morton'
  },
  

  // Grief Support for Women (10 videos)
  {
    id: 'WBxM0_9e2hI',
    title: 'The 3 Things: Essential for Grief Recovery',
    category: 'Grief',
    thumbnail: `https://img.youtube.com/vi/WBxM0_9e2hI/maxresdefault.jpg`,
    duration: '18 min',
    instructor: 'Grief Recovery Specialist'
  },
  
  {
    id: 'xBK3l0Ez884',
    title: "The #1 Grief Solution You've Never Heard Of (INSTANT Relief)",
    category: 'Grief',
    thumbnail: `https://img.youtube.com/vi/xBK3l0Ez884/maxresdefault.jpg`,
    duration: '20 min',
    instructor: 'Grief Recovery Specialist'
  },
  {
    id: 'jI2-LLC6ya4',
    title: 'Stop following the stages of grief… Kati unfiltered',
    category: 'Grief',
    thumbnail: `https://img.youtube.com/vi/jI2-LLC6ya4/maxresdefault.jpg`,
    duration: '16 min',
    instructor: 'Kati Morton'
  },
 

  // Work-life Balance (10 videos)
 
  {
    id: 'QHkXvPq2pQE',  // Therapy in a Nutshell - Professional Growth
    title: 'Balancing Career Growth',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/QHkXvPq2pQE/maxresdefault.jpg`,
    duration: '26 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'bF_1ZiFta-E',  // Kati Morton - Time Management
    title: 'Effective Time Management',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/bF_1ZiFta-E/maxresdefault.jpg`,
    duration: '22 min',
    instructor: 'Kati Morton'
  },
  {
    id: 'vXAr5dh23zU',  // Therapy in a Nutshell - Stress Management
    title: 'Managing Work Stress',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/vXAr5dh23zU/maxresdefault.jpg`,
    duration: '25 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'tEmt1Znux58',  // Kati Morton - Setting Boundaries
    title: 'Professional Boundaries',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/tEmt1Znux58/maxresdefault.jpg`,
    duration: '28 min',
    instructor: 'Kati Morton'
  },
  {
    id: 'Jl0V2KK7VLA',  // Therapy in a Nutshell - Self Care
    title: 'Self-Care for Professionals',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/Jl0V2KK7VLA/maxresdefault.jpg`,
    duration: '23 min',
    instructor: 'Emma McAdam'
  },
  {
    id: 'gsYL4PC0hyk',  // Therapy in a Nutshell - Burnout Prevention
    title: 'Preventing Professional Burnout',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/gsYL4PC0hyk/maxresdefault.jpg`,
    duration: '27 min',
    instructor: 'Emma McAdam'
  },

  
  {
    id: 'wFUxiIjp-Nk',  // Therapy in a Nutshell - Life Purpose
    title: 'Finding Purpose in Work and Life',
    category: 'Work-life Balance',
    thumbnail: `https://img.youtube.com/vi/wFUxiIjp-Nk/maxresdefault.jpg`,
    duration: '25 min',
    instructor: 'Emma McAdam'
  }
];

const TherapySession: React.FC<TherapySessionProps> = ({ selectedCategories, viewType = 'grid' }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Show all videos if no categories are selected
    const filtered = selectedCategories.length === 0
      ? therapyVideos
      : therapyVideos.filter((video) =>
          selectedCategories.includes(video.category)
        );
    setFilteredVideos(filtered);
  }, [selectedCategories]);

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
          onClick={() => setSelectedVideo(video)}
        >
          <div className="relative pb-[56.25%]">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-lavender"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-1">{video.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{video.category}</span>
              <span>{video.duration}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">By {video.instructor}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {Array.from(new Set(filteredVideos.map(v => v.category))).map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-2xl font-serif font-semibold text-gray-800">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos
              .filter(video => video.category === category)
              .map(video => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/10 rounded-md flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{video.title}</h4>
                      <p className="text-sm text-gray-500">{video.duration}</p>
                      <p className="text-xs text-gray-400 mt-1">By {video.instructor}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-12">
      {selectedVideo ? (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}`}
              title={selectedVideo.title}
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <p className="text-sm text-gray-500">
                {selectedVideo.duration} • {selectedVideo.instructor}
              </p>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-lavender hover:text-lavender/80"
            >
              Back to Videos
            </button>
          </div>
        </div>
      ) : viewType === 'grid' ? (
        renderGrid()
      ) : (
        renderDashboard()
      )}
    </div>
  );
};

export default TherapySession; 