import React, { useState, useEffect } from 'react';
import { Play, Link2, Upload, ExternalLink, Video, Check, RefreshCw, Sparkles } from 'lucide-react';

const DEFAULT_VIDEOS = [
  {
    id: '1',
    title: 'Aloe Vera Gel — 3D Motion Showcase',
    desc: 'Cinematic 3D render and 360-degree rotation of the flagship 100g Sureal Aloe Vera Gel jar with signature gold cap in emerald studio lighting.',
    driveId: '1d0E9yY_iafTI6rzxRDq3gn2AU3OVFME2',
    originalUrl: 'https://drive.google.com/file/d/1d0E9yY_iafTI6rzxRDq3gn2AU3OVFME2/view?usp=drivesdk',
    tag: 'Flagship 3D Film',
    productFeatured: 'Sureal Aloe Vera Gel (100g, ₹280)',
    thumbnail: '/images/aloe_3d_render_crop.png',
  },
  {
    id: '2',
    title: 'Coffee Cocoa Body Scrub — 3D Showcase & Packaging',
    desc: 'Cinematic 3D render and physical inspection of the handcrafted Coffee Cocoa Body Scrub jar with roasted coffee beans on wooden pedestal.',
    driveId: '1cFkxvAJr-gEgsW73ip7RWZ5DSq8I8pxT',
    originalUrl: 'https://drive.google.com/file/d/1cFkxvAJr-gEgsW73ip7RWZ5DSq8I8pxT/view?usp=drivesdk',
    tag: 'Coffee Scrub 3D',
    productFeatured: 'Coffee Cocoa Body Scrub (100g, ₹250)',
    thumbnail: '/images/coffee_cocoa_scrub_real.png',
  },
];

export default function VideoSection() {
  const [videos, setVideos] = useState(() => {
    // Clear old versions from localStorage so updated titles display immediately
    try {
      const saved = localStorage.getItem('innovexa_custom_videos_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_VIDEOS;
  });

  const [activeVideoId, setActiveVideoId] = useState('1');
  const [showAttachPanel, setShowAttachPanel] = useState(false);
  const [customLinkInput, setCustomLinkInput] = useState('');
  const [customTitleInput, setCustomTitleInput] = useState('');
  const [attachSuccess, setAttachSuccess] = useState(false);

  // Active selected video
  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];

  // Helper to construct embed URL
  const getEmbedUrl = (video) => {
    if (video.customFileUrl) return video.customFileUrl;
    if (video.driveId) {
      return `https://drive.google.com/file/d/${video.driveId}/preview`;
    }
    if (video.url) {
      // Check if it's a drive URL
      const driveMatch = video.url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (driveMatch) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      }
      return video.url;
    }
    return `https://drive.google.com/file/d/1d0E9yY_iafTI6rzxRDq3gn2AU3OVFME2/preview`;
  };

  // Attach new custom video link
  const handleAttachLink = (e) => {
    e.preventDefault();
    if (!customLinkInput.trim()) return;

    let driveId = null;
    const match = customLinkInput.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      driveId = match[1];
    }

    const newVideo = {
      id: String(Date.now()),
      title: customTitleInput.trim() || 'Custom Product Video',
      desc: 'User attached demonstration video.',
      driveId: driveId,
      url: customLinkInput.trim(),
      originalUrl: customLinkInput.trim(),
      tag: 'New Upload',
      productFeatured: 'Surreal Treasures Custom Product',
    };

    const updated = [newVideo, ...videos];
    setVideos(updated);
    setActiveVideoId(newVideo.id);
    localStorage.setItem('innovexa_custom_videos_v3', JSON.stringify(updated));

    setCustomLinkInput('');
    setCustomTitleInput('');
    setAttachSuccess(true);
    setTimeout(() => {
      setAttachSuccess(false);
      setShowAttachPanel(false);
    }, 2000);
  };

  // Local file upload handling
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const newVideo = {
      id: String(Date.now()),
      title: file.name.replace(/\.[^/.]+$/, ''),
      desc: 'Locally attached 3D video file.',
      customFileUrl: objectUrl,
      originalUrl: '#',
      tag: 'Local File',
      productFeatured: 'Uploaded Product Video',
    };

    const updated = [newVideo, ...videos];
    setVideos(updated);
    setActiveVideoId(newVideo.id);
    localStorage.setItem('innovexa_custom_videos_v3', JSON.stringify(updated));
    setShowAttachPanel(false);
  };

  // Reset to original links
  const handleResetVideos = () => {
    setVideos(DEFAULT_VIDEOS);
    setActiveVideoId('1');
    localStorage.removeItem('innovexa_custom_videos_v3');
  };

  return (
    <section id="campaign-video" className="py-24 bg-[#122b20] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-4">
              <Video className="w-3.5 h-3.5" />
              <span>3D Motion & Campaign Experience</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight">
              See the Craft <span className="italic text-[#c5a880]">in Motion.</span>
            </h2>
            <p className="text-sm md:text-base text-[#a3b8ad] max-w-xl font-light mt-2">
              Watch authentic 3D demonstrations, packaging design, and daily application rituals created by INNOVEXA for Surreal Treasures.
            </p>
          </div>

          {/* Action to attach or change videos */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAttachPanel(!showAttachPanel)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#173829] hover:bg-[#204a36] border border-white/20 text-white text-xs font-medium uppercase tracking-wider transition-all"
            >
              <Link2 className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>{showAttachPanel ? 'Close Video Panel' : 'Attach / Change Video'}</span>
            </button>

            {videos.length > DEFAULT_VIDEOS.length && (
              <button
                onClick={handleResetVideos}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                title="Reset to default brand videos"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Video Attach Panel */}
        {showAttachPanel && (
          <div className="mb-10 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md animate-fadeIn">
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl text-white mb-2">Attach Video Link or Upload File</h3>
              <p className="text-xs text-[#a3b8ad] mb-6">
                Paste any Google Drive share link, direct video link, or upload an MP4 file. The website will immediately update with your 3D video.
              </p>

              <form onSubmit={handleAttachLink} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-1">
                    Video Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={customTitleInput}
                    onChange={(e) => setCustomTitleInput(e.target.value)}
                    placeholder="e.g. Surreal Treasures 3D Jar Rotation"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/70 mb-1">
                    Google Drive or Video URL
                  </label>
                  <input
                    type="url"
                    value={customLinkInput}
                    onChange={(e) => setCustomLinkInput(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#c5a880] hover:bg-[#d6ba92] text-[#122b20] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                  >
                    {attachSuccess ? <Check className="w-4 h-4 text-emerald-900" /> : <Link2 className="w-4 h-4" />}
                    <span>{attachSuccess ? 'Attached Successfully!' : 'Save & Play Video'}</span>
                  </button>

                  <label className="cursor-pointer px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Local Video File</span>
                    <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {videos.map((vid) => (
            <button
              key={vid.id}
              onClick={() => setActiveVideoId(vid.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeVideoId === vid.id
                  ? 'bg-white text-[#122b20] shadow-lg scale-102'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${activeVideoId === vid.id ? 'text-[#173829] fill-[#173829]' : 'text-white'}`} />
              <span>{vid.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeVideoId === vid.id ? 'bg-emerald-100 text-emerald-800' : 'bg-white/15 text-white/60'
              }`}>
                {vid.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Main Video Display Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Video Frame */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl relative aspect-video">
            {activeVideo.customFileUrl ? (
              <video
                src={activeVideo.customFileUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={getEmbedUrl(activeVideo)}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>

          {/* Active Video Details & External Links */}
          <div className="lg:col-span-4 bg-white/5 border border-white/15 rounded-3xl p-7 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">
                {activeVideo.tag}
              </span>
              <h3 className="font-serif text-3xl font-light text-white mt-1 mb-3">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-[#a3b8ad] font-light leading-relaxed mb-6">
                {activeVideo.desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#cad8d0]">
                <div className="flex items-center justify-between">
                  <span>Product Featured</span>
                  <span className="font-semibold text-[#c5a880]">
                    {activeVideo.productFeatured || 'Sureal Aloe Vera Gel (100g, ₹280)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Brand Partner</span>
                  <span className="font-semibold text-white">Surreal Treasures (Indore)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>3D Motion Direction</span>
                  <span className="font-semibold text-white">INNOVEXA Team</span>
                </div>
              </div>
            </div>

            {/* External Direct Drive Link Button */}
            {activeVideo.originalUrl && activeVideo.originalUrl !== '#' && (
              <a
                href={activeVideo.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Open in Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#c5a880]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
