import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Volume2, VolumeX, Sparkles, Flower } from 'lucide-react';

// --- Data ---
const NAMES = [
  "Nguyễn Thị Thùy Linh", "Trần Thị Thanh Thùy", "Sơn Bích Ngọc", 
  "Nguyễn Mai Quế Trân", "Huỳnh Thị Kiều Oanh", "Nguyễn Thị Hương", 
  "Lê Khánh Tâm", "Ngô Thị Minh Thi", "Đoàn Hải Yến", 
  "Nguyễn Thị Thuý Hằng", "Nguyễn Khánh Vy", "Lê Thị Ngọc Hằng", 
  "Đinh Anh Thư", "Nguyễn Thị Thu Hoài", "Nguyễn Thị Ngọc Muội"
];

const CELEBRATION_DATA = NAMES.map((name, i) => ({
  id: i + 1,
  name: name,
  message: [
    "Cảm ơn chị - 'người giữ lửa' bản lĩnh, luôn là điểm tựa tin cậy cho tài chính công ty. Chúc chị Thùy Linh mãi rạng rỡ và hạnh phúc!",
    "Nhịp cầu ngôn ngữ, kết nối niềm tin. Chúc chị Thanh Thùy luôn giữ được sự tự tin và nụ cười rạng rỡ trên môi.",
    "Như viên ngọc quý luôn tận tụy với từng con số. Chúc chị Bích Ngọc một ngày 8/3 thật ngọt ngào và xinh đẹp rạng rỡ.",
    "Người truyền lửa và gắn kết đại gia đình chúng ta. Chúc chị Quế Trân luôn xinh đẹp, tự tin và tỏa sáng rực rỡ.",
    "Cô gái của những dòng code đầy logic nhưng tâm hồn vẫn mềm mại như hoa. Chúc chị Kiều Oanh luôn xinh đẹp và tự tin chinh phục mọi thử thách, ước mơ",
    "Sự cẩn trọng trong từng chi tiết và tinh tế trong ngôn ngữ. Chúc chị Hương luôn xinh đẹp và gặt hái nhiều thành công mới.",
    "Với cái tâm trong nghề và sự nhiệt huyết rực cháy. Chúc Khánh Tâm luôn 'chốt deal' mỏi tay và hạnh phúc tràn đầy.",
    "Xinh đẹp và giỏi giang. Chúc Minh Thi ngày 8/3 ngập tràn hoa, quà và tình yêu thương.",
    "Tài năng và bản lĩnh. Chúc chị Hải Yến luôn giữ vững phong độ và bay cao, bay xa hơn nữa và luôn vui vẻ, xinh đẹp.",
    "Dịu dàng trong giao tiếp, chuyên nghiệp trong công việc. Chúc chị Thúy Hằng luôn là bông hoa đẹp nhất, ngát hương nhất.",
    "Đôi mắt tinh tường giữ gìn chất lượng cho từng sản phẩm. Chúc chị Vy luôn vui tươi, trẻ trung và yêu đời như thế nhé.",
    "Sự chu đáo và cẩn thận giúp mọi việc luôn trôi chảy. Chúc Ngọc Hằng một ngày 8/3 luôn xinh đẹp, hạnh phúc và thành công rực rỡ.",
    "Bản lĩnh và tỉ mỉ. Chúc chị Anh Thư luôn xinh đẹp, hạnh phúc và gặt hái nhiều thành công trong sự nghiệp.",
    "Tự tin và bản lĩnh. Chúc chị Thu Hoài luôn xinh đẹp, tràn đầy năng lượng và niềm vui mỗi ngày.",
    "Trẻ trung, năng động và tài năng. Chúc Ngọc Muội luôn xinh xắn, đáng yêu và gặp thật nhiều may mắn trong cuộc sống."
  ][i],
  // Đường dẫn ảnh trong thư mục public/images/
  image: `/images/${i + 1}.jpg`, 
}));

// --- Components ---

const BACKGROUND_ICONS = [
  "https://img.icons8.com/color/48/rose.png",
  "https://img.icons8.com/color/48/tulip.png",
  "https://img.icons8.com/color/48/sunflower.png",
  "https://img.icons8.com/color/48/daisy.png",
  "https://img.icons8.com/color/48/cherry-blossom.png",
  "https://img.icons8.com/color/48/heart-with-arrow.png",
  "https://img.icons8.com/color/48/love-circled.png",
  "https://img.icons8.com/color/48/gift.png",
  "https://img.icons8.com/plasticine/100/flower.png",
  "https://img.icons8.com/dusk/64/butterfly.png"
];

const Petal: React.FC<{ delay: number }> = ({ delay }) => {
  const randomX = Math.random() * 100; // Random horizontal start position
  const duration = 15 + Math.random() * 15; // Slower fall duration between 15-30s
  const size = 20 + Math.random() * 30; // Larger random size
  const icon = BACKGROUND_ICONS[Math.floor(Math.random() * BACKGROUND_ICONS.length)];
  const startRotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ y: -100, x: `${randomX}vw`, opacity: 0, rotate: startRotation }}
      animate={{
        y: '110vh',
        x: `${randomX + (Math.random() * 40 - 20)}vw`, // Drift more
        opacity: [0, 1, 1, 0],
        rotate: startRotation + 360 + Math.random() * 360,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        backgroundImage: `url("${icon}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

const Background = () => {
  // Increased to 60 items for more density
  const petals = Array.from({ length: 60 }).map((_, i) => (
    <Petal key={i} delay={Math.random() * 30} />
  ));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-b from-pink-100 via-rose-100 to-purple-100 opacity-80" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-linear-to-tr from-transparent via-white/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/flower-trail.png')]"></div>

      {petals}
    </div>
  );
};

const FloatingHeart = () => {
  const randomX = Math.random() * 100;
  const duration = 5 + Math.random() * 5;
  const size = 10 + Math.random() * 20;

  return (
    <motion.div
      initial={{ y: '110vh', x: `${randomX}vw`, opacity: 0, scale: 0.5 }}
      animate={{
        y: -100,
        opacity: [0, 0.8, 0],
        scale: 1,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "easeOut",
      }}
      className="absolute text-pink-400 pointer-events-none z-0"
      style={{ left: 0 }}
    >
      <Heart fill="currentColor" size={size} />
    </motion.div>
  );
};

const GalleryItem: React.FC<{ item: typeof CELEBRATION_DATA[0] }> = ({ item }) => {
  return (
    <div className="relative group mx-4 md:mx-8 flex-shrink-0">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full p-1 bg-linear-to-tr from-pink-400 via-rose-300 to-purple-400 shadow-lg shadow-pink-200/50">
        <div className="absolute inset-0 rounded-full animate-pulse bg-white/30 blur-md" />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-full border-4 border-white relative z-10"
          referrerPolicy="no-referrer"
        />
        {/* Sparkles around photo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-10px] pointer-events-none"
        >
          <Sparkles className="absolute top-0 left-1/2 text-yellow-300 w-4 h-4" />
          <Sparkles className="absolute bottom-0 right-1/2 text-pink-300 w-4 h-4" />
        </motion.div>
      </div>
      <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-rose-800 font-serif font-medium">{item.name}</p>
      </div>
    </div>
  );
};

const PopupCard = ({ 
  item, 
  style,
  onRemove 
}: { 
  item: typeof CELEBRATION_DATA[0]; 
  style: React.CSSProperties;
  onRemove: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Flip open shortly after appearing
    const timer = setTimeout(() => setIsFlipped(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="absolute w-90 md:w-98 aspect-[3/4] pointer-events-auto"
      style={{ 
        ...style,
        perspective: '1000px',
        zIndex: 50
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full h-full relative shadow-2xl rounded-3xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-linear-to-br from-pink-300 to-rose-400 border-[8px] border-white"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Cute Pattern Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          
          <div className="w-full h-full border-4 border-dashed border-white/50 rounded-2xl flex flex-col items-center justify-center p-4 text-center relative z-10">
            
            {/* Corner Decorations */}
            <Flower className="absolute top-2 left-2 text-white w-6 h-6 rotate-[-15deg]" />
            <Flower className="absolute top-2 right-2 text-white w-6 h-6 rotate-[15deg]" />
            <Heart className="absolute bottom-2 left-2 text-white w-6 h-6 rotate-[-15deg]" fill="currentColor" />
            <Heart className="absolute bottom-2 right-2 text-white w-6 h-6 rotate-[15deg]" fill="currentColor" />

            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full mb-4 shadow-inner">
               <Heart className="text-white w-16 h-16 drop-shadow-md animate-pulse" fill="currentColor" />
            </div>
            
            <h2 className="text-3xl font-serif text-white font-bold drop-shadow-md transform -rotate-2">For You</h2>
            <div className="mt-2 text-white/90 text-sm font-medium bg-rose-500/30 px-3 py-1 rounded-full">
                Happy Women's Day
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-white border-[8px] border-pink-100 flex flex-col"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          {/* Top decorative section with image */}
          <div className="h-1/2 w-full p-4 pb-0">
            {/* Tulip/Flower Images */}
            <img src="https://png.pngtree.com/png-clipart/20230928/original/pngtree-tulip-icon-design-vector-green-bloom-summer-vector-png-image_12898209.png" className="absolute top-2 left-2 w-8 h-8 opacity-80 rotate-[-10deg]" alt="tulip" />
            <img src="https://img.icons8.com/color/48/rose.png" className="absolute top-2 right-2 w-8 h-8 opacity-80 rotate-[10deg]" alt="rose" />

            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-pink-100 shadow-sm">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 pt-12 px-5 pb-5 text-center flex flex-col items-center relative">
            {/* Background decorations inside */}
            <Heart className="absolute top-20 left-4 text-pink-100 w-8 h-8 -rotate-12" fill="currentColor" />
            <Heart className="absolute top-10 right-4 text-pink-100 w-6 h-6 rotate-12" fill="currentColor" />

            <h3 className="text-xl font-serif text-rose-600 font-bold mb-1 relative z-10">{item.name}</h3>
            
            <div className="flex gap-1 mb-3">
                <Heart size={12} className="text-rose-300" fill="currentColor" />
                <Heart size={12} className="text-rose-300" fill="currentColor" />
                <Heart size={12} className="text-rose-300" fill="currentColor" />
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
              <p className="text-gray-600 font-serif italic text-base leading-relaxed">
                "{item.message}"
              </p>
            </div>

            {/* Bottom decoration */}
            <div className="w-full flex justify-between items-end mt-2 opacity-60">
                <img src="https://img.icons8.com/color/48/rose.png" className="w-6 h-6" alt="rose" />
                <span className="text-[10px] text-rose-400 font-bold tracking-widest uppercase">March 8</span>
                <img src="https://png.pngtree.com/png-clipart/20230928/original/pngtree-tulip-icon-design-vector-green-bloom-summer-vector-png-image_12898209.png" className="w-6 h-6" alt="tulip" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StartOverlay = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-white text-rose-600 px-8 py-4 rounded-full font-serif text-xl font-bold shadow-xl flex items-center gap-3 border-2 border-rose-100"
      >
        <Heart fill="currentColor" className="text-rose-500" />
        Start Celebration
      </motion.button>
    </motion.div>
  );
};

interface ActiveCard {
  id: string;
  data: typeof CELEBRATION_DATA[0];
  x: number;
  y: number;
  rotation: number;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeCards, setActiveCards] = useState<ActiveCard[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextCardIndex = useRef(0);

  // Card Spawning Logic
  useEffect(() => {
    if (!started) return;

    const spawnCard = () => {
      const item = CELEBRATION_DATA[nextCardIndex.current];
      nextCardIndex.current = (nextCardIndex.current + 1) % CELEBRATION_DATA.length;

      // Calculate random position within a safe central area
      // Viewport is roughly 100vw x 100vh
      // Card is approx 300px wide (approx 20-30vw on desktop)
      // We want to avoid the very edges
      const isMobile = window.innerWidth < 768;
      
      let x, y;
      if (isMobile) {
        // On mobile, stack them more centrally but with slight offsets
        x = 5 + Math.random() * 10; // 5% to 15% from left (centering handled by width)
        y = 15 + Math.random() * 20; // 15% to 35% from top
      } else {
        // Desktop: spread out more
        x = 20 + Math.random() * 40; // 20% to 60%
        y = 15 + Math.random() * 30; // 15% to 45%
      }

      const newCard: ActiveCard = {
        id: Date.now().toString() + Math.random(),
        data: item,
        x,
        y,
        rotation: (Math.random() - 0.5) * 20, // -10 to 10 degrees tilt
      };

      setActiveCards(prev => [...prev, newCard]);

      // Schedule removal
      setTimeout(() => {
        setActiveCards(prev => prev.filter(c => c.id !== newCard.id));
      }, 12000); // 12 seconds display time
    };

    // Initial spawn
    spawnCard();

    // Interval spawn
    const interval = setInterval(spawnCard, 6000); // Every 6 seconds

    return () => clearInterval(interval);
  }, [started]);

  const handleStart = () => {
    setStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-gray-900 selection:bg-pink-200 selection:text-pink-900">
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_1822032a42.mp3?filename=piano-moment-11155.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Background />
      
      {/* Floating Hearts Layer */}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingHeart key={i} />
      ))}

      <AnimatePresence>
        {!started && <StartOverlay onStart={handleStart} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header */}
        <header className="pt-12 pb-8 text-center px-4 relative z-20 pointer-events-none">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 drop-shadow-sm"
          >
            Happy Women's Day
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 text-lg md:text-xl text-rose-800 font-light tracking-wide"
          >
            Celebrating beauty, strength, and grace.
          </motion.p>
        </header>

        {/* Card Container Layer */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {activeCards.map((card) => (
              <PopupCard 
                key={card.id} 
                item={card.data} 
                onRemove={() => {}}
                style={{ 
                  top: `${card.y}%`, 
                  left: `${card.x}%`, 
                  rotate: `${card.rotation}deg` 
                }} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Infinite Scrolling Gallery (Background Layer) */}
        <div className="absolute bottom-20 w-full opacity-50 z-10">
          <div className="relative w-full max-w-[100vw] overflow-hidden">
            <div className="flex w-max animate-marquee">
              {CELEBRATION_DATA.map((item) => (
                <GalleryItem key={`bg-${item.id}`} item={item} />
              ))}
              {CELEBRATION_DATA.map((item) => (
                <GalleryItem key={`bg-dup-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Controls */}
        <footer className="absolute bottom-0 w-full p-6 flex justify-between items-center text-rose-800/60 text-sm z-40 bg-white/30 backdrop-blur-sm">
          <div>March 8, 2026</div>
          <button 
            onClick={toggleAudio}
            className="p-3 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-colors shadow-sm pointer-events-auto"
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </footer>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
