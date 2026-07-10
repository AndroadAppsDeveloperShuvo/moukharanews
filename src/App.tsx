import React, { useState, useRef, useEffect, useCallback, ChangeEvent, DragEvent } from 'react';
import { 
  Tv, 
  FileText, 
  Sparkles, 
  Tag, 
  Sliders, 
  Download, 
  Upload, 
  Check, 
  Plus, 
  RefreshCw, 
  Globe, 
  Facebook, 
  Youtube, 
  ChevronRight,
  Info,
  Layers,
  Sparkle,
  Bookmark,
  Instagram,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface FrameTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  footerBg: string;
  accentColor: string;
  badgeBg: string;
  badgeTextColor: string;
}

const TEMPLATES: FrameTemplate[] = [
  {
    id: 'img_2220',
    name: 'মূল লাল থিম (Default)',
    primaryColor: '#b91c1c', // red-700
    secondaryColor: '#facc15', // yellow-400
    footerBg: '#7f1d1d', // dark red
    accentColor: '#ffffff',
    badgeBg: '#fbbf24',
    badgeTextColor: '#111827'
  },
  {
    id: 'somoy_style',
    name: 'সময় টিভি থিম (Somoy TV)',
    primaryColor: '#991b1b', // deep crimson
    secondaryColor: '#ff9000', // somoy orange
    footerBg: '#1c1c1c', // dark grey/black
    accentColor: '#ffffff',
    badgeBg: '#e25822', // somoy badge orange
    badgeTextColor: '#ffffff'
  },
  {
    id: 'channel24_style',
    name: 'চ্যানেল ২৪ থিম (Channel 24)',
    primaryColor: '#0a2540', // deep navy
    secondaryColor: '#00e5ff', // neon cyan
    footerBg: '#051026', // darker navy
    accentColor: '#ffffff',
    badgeBg: '#00e5ff',
    badgeTextColor: '#051026'
  },
  {
    id: 'rtv_style',
    name: 'আরটিভি থিম (RTV)',
    primaryColor: '#ea580c', // orange-red
    secondaryColor: '#2563eb', // rtv blue
    footerBg: '#0f172a', // dark blue footer
    accentColor: '#ffffff',
    badgeBg: '#ea580c',
    badgeTextColor: '#ffffff'
  },
  {
    id: 'banglavision_style',
    name: 'বাংলাভিশন থিম (BanglaVision)',
    primaryColor: '#701a75', // deep plum purple
    secondaryColor: '#facc15', // golden yellow
    footerBg: '#4a044e', // dark purple
    accentColor: '#ffffff',
    badgeBg: '#facc15',
    badgeTextColor: '#1e1b4b'
  },
  {
    id: 'jamuna_style',
    name: 'যমুনা টিভি থিম (Jamuna)',
    primaryColor: '#1e3a8a', // deep blue
    secondaryColor: '#ef4444', // bright red
    footerBg: '#0f172a',
    accentColor: '#f8fafc',
    badgeBg: '#ef4444',
    badgeTextColor: '#ffffff'
  },
  {
    id: 'ekattor_style',
    name: '৭১ টিভি থিম (71 News)',
    primaryColor: '#1f2937', // dark grey
    secondaryColor: '#fbbf24', // golden yellow
    footerBg: '#0f172a',
    accentColor: '#ffffff',
    badgeBg: '#fbbf24',
    badgeTextColor: '#111827'
  },
  {
    id: 'independent_style',
    name: 'ইনডিপেনডেন্ট থিম (Independent)',
    primaryColor: '#1e293b',
    secondaryColor: '#22c55e', // bright green
    footerBg: '#0f172a',
    accentColor: '#ffffff',
    badgeBg: '#22c55e',
    badgeTextColor: '#ffffff'
  }
];

interface ChannelPreset {
  id: string;
  name: string;
  logo: string; // 'somoy' | 'channel24' | 'rtv' | 'banglavision' | 'jamuna' | 'ekattor' | 'independent'
  channelName: string;
  channelStyle: string;
  templateId: string;
  badgeType: string;
  customBadgeText?: string;
  badgeBgColor: string;
  borderColor: string;
}

const CHANNEL_PRESETS: ChannelPreset[] = [
  {
    id: 'preset_somoy',
    name: 'সময় টিভি (Somoy TV)',
    logo: 'somoy',
    channelName: 'সময় | NEWS',
    channelStyle: 'badge-red',
    templateId: 'somoy_style',
    badgeType: 'breaking',
    badgeBgColor: '#dc2626',
    borderColor: '#ff9000'
  },
  {
    id: 'preset_channel24',
    name: 'চ্যানেল ২৪ (Channel 24)',
    logo: 'channel24',
    channelName: 'CHANNEL 24',
    channelStyle: 'badge-yellow',
    templateId: 'channel24_style',
    badgeType: 'live',
    badgeBgColor: '#00e5ff',
    borderColor: '#00e5ff'
  },
  {
    id: 'preset_rtv',
    name: 'আরটিভি (RTV)',
    logo: 'rtv',
    channelName: 'RTV | NEWS',
    channelStyle: 'badge-red',
    templateId: 'rtv_style',
    badgeType: 'live',
    badgeBgColor: '#ea580c',
    borderColor: '#ea580c'
  },
  {
    id: 'preset_banglavision',
    name: 'বাংলাভিশন (BanglaVision)',
    logo: 'banglavision',
    channelName: 'বাংলাভিশন',
    channelStyle: 'badge-yellow',
    templateId: 'banglavision_style',
    badgeType: 'custom',
    customBadgeText: 'বিশেষ সংবাদ',
    badgeBgColor: '#701a75',
    borderColor: '#facc15'
  },
  {
    id: 'preset_jamuna',
    name: 'যমুনা টিভি (Jamuna TV)',
    logo: 'jamuna',
    channelName: 'JAMUNA TV',
    channelStyle: 'badge-red',
    templateId: 'jamuna_style',
    badgeType: 'live',
    badgeBgColor: '#ef4444',
    borderColor: '#fbbf24'
  },
  {
    id: 'preset_ekattor',
    name: '৭১ টিভি (71 News)',
    logo: 'ekattor',
    channelName: '71 | NEWS',
    channelStyle: 'badge-black',
    templateId: 'ekattor_style',
    badgeType: 'breaking',
    badgeBgColor: '#fbbf24',
    borderColor: '#fbbf24'
  },
  {
    id: 'preset_independent',
    name: 'ইনডিপেনডেন্ট (Independent)',
    logo: 'independent',
    channelName: 'INDEPENDENT',
    channelStyle: 'badge-yellow',
    templateId: 'independent_style',
    badgeType: 'live',
    badgeBgColor: '#22c55e',
    borderColor: '#22c55e'
  }
];

const NEWS_PRESETS = [
  {
    category: 'ব্রেকিং নিউজ',
    headline: 'ব্রেকিং নিউজ: দেশজুড়ে ডিজিটাল সেবায় নতুন বিপ্লবের সূচনা!',
    badge: 'breaking',
    badgeBg: '#dc2626'
  },
  {
    category: 'রাজনীতি',
    headline: 'আজকের খবর: দেশ গঠনে ঐক্যবদ্ধ হয়ে কাজ করার বিশেষ আহ্বান',
    badge: 'custom',
    badgeText: 'বিশেষ সংবাদ',
    badgeBg: '#7c3aed'
  },
  {
    category: 'খেলাধুলা',
    headline: 'ক্রীড়াঙ্গন: ঐতিহাসিক ম্যাচে ভারতকে হারিয়ে সিরিজ জিতলো বাংলাদেশ!',
    badge: 'custom',
    badgeText: 'খেলাধুলা',
    badgeBg: '#16a34a'
  },
  {
    category: 'আবহাওয়া',
    headline: 'আবহাওয়ার সতর্কবার্তা: বঙ্গোপসাগরে লঘুচাপ, তিন বন্দরে ৩ নম্বর সতর্ক সংকেত',
    badge: 'live',
    badgeBg: '#dc2626'
  },
  {
    category: 'বিনোদন',
    headline: 'বিনোদন: আন্তর্জাতিক চলচ্চিত্র উৎসবে সেরা চলচ্চিত্রের গৌরব অর্জন করলো বাংলা সিনেমা',
    badge: 'custom',
    badgeText: 'বিনোদন',
    badgeBg: '#db2777'
  }
];

const getBengaliTextWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  coefficient: number = 0.68,
  useFallback: boolean = true
): number => {
  const measured = ctx.measureText(text).width;
  if (!useFallback) {
    return measured;
  }
  const estimated = text.length * fontSize * coefficient;
  return Math.max(measured, estimated);
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'theme' | 'content' | 'advanced'>('theme');

  // Auto-sync setting to control if name & logo change with presets
  const [autoSyncNameLogo, setAutoSyncNameLogo] = useState<boolean>(true);

  // New features for pro frames and customization
  const [imageLayoutMode, setImageLayoutMode] = useState<'single' | 'split-horizontal' | 'split-vertical'>('single');
  const [showBranding, setShowBranding] = useState<boolean>(true);
  const [frameLayoutDesign, setFrameLayoutDesign] = useState<'split-banner' | 'full-overlay'>('split-banner');
  const [bottomBarStyle, setBottomBarStyle] = useState<'light-grid' | 'dark-gradient' | 'solid'>('light-grid');

  // Secondary inset image overlay
  const [showInsetImage, setShowInsetImage] = useState<boolean>(false);
  const [insetShape, setInsetShape] = useState<'circle' | 'square'>('circle');
  const [insetSize, setInsetSize] = useState<number>(180);
  const [insetX, setInsetX] = useState<number>(540); // canvas width is 1080, default to center
  const [insetY, setInsetY] = useState<number>(750); // sits nicely on the dividing line
  const [insetBorderColor, setInsetBorderColor] = useState<string>('#dc2626');
  const [insetBorderWidth, setInsetBorderWidth] = useState<number>(8);

  // News content states
  const [headline, setHeadline] = useState('');
  const [dateText, setDateText] = useState('১০ জুলাই ২০২৬');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('somoy_style');

  // Headline customization states
  const [headlineSize, setHeadlineSize] = useState<number>(54);
  const [headlineXOffset, setHeadlineXOffset] = useState<number>(0);
  const [headlineYOffset, setHeadlineYOffset] = useState<number>(0);
  const [autoSizeHeadline, setAutoSizeHeadline] = useState<boolean>(true);
  const [headlineLineHeight, setHeadlineLineHeight] = useState<number>(1.2);

  // Channel Name & Eye-catching styles
  const [channelName, setChannelName] = useState('মৌখাড়া সত্যকন্ঠ');
  const [channelStyle, setChannelStyle] = useState<string>('badge-red'); // solid-white, badge-red, badge-yellow, badge-black, glowing-gold
  const [customLogoEnabled, setCustomLogoEnabled] = useState<boolean>(false);
  const [builtInLogo, setBuiltInLogo] = useState<string>('globe'); // globe, tv, fire, star, play, somoy, channel24...

  // Dynamic Social Handles
  const [showWebsite, setShowWebsite] = useState<boolean>(true);
  const [websiteUrl, setWebsiteUrl] = useState('www.moukharanews.com');

  const [showFacebook, setShowFacebook] = useState<boolean>(true);
  const [facebookHandle, setFacebookHandle] = useState('Moukhara News');

  const [showYoutube, setShowYoutube] = useState<boolean>(true);
  const [youtubeHandle, setYoutubeHandle] = useState('Moukhara News');

  const [showTiktok, setShowTiktok] = useState<boolean>(false);
  const [tiktokHandle, setTiktokHandle] = useState('moukharanews');

  const [showInstagram, setShowInstagram] = useState<boolean>(false);
  const [instagramHandle, setInstagramHandle] = useState('@moukharanews');

  // Badges setup (live / breaking)
  const [badgeType, setBadgeType] = useState<string>('breaking'); // breaking, live, none, custom
  const [customBadgeText, setCustomBadgeText] = useState('বিশেষ সংবাদ');
  const [badgeBgColor, setBadgeBgColor] = useState<string>('#dc2626'); 
  const [borderColor, setBorderColor] = useState<string>('#ff9000'); 

  // Drag and drop / upload visual feedback
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Image references for uploaded files
  const uploadedImageRef = useRef<HTMLImageElement | null>(null);
  const uploadedImage2Ref = useRef<HTMLImageElement | null>(null);
  const customLogoImgRef = useRef<HTMLImageElement | null>(null);
  const insetPhotoRef = useRef<HTMLImageElement | null>(null);

  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photo2Loaded, setPhoto2Loaded] = useState(false);
  const [customLogoLoaded, setCustomLogoLoaded] = useState(false);
  const [insetPhotoLoaded, setInsetPhotoLoaded] = useState(false);

  // Load resources on mount
  useEffect(() => {
    const uploadImg = new Image();
    uploadImg.onload = () => {
      setPhotoLoaded(true);
    };
    uploadedImageRef.current = uploadImg;

    const uploadImg2 = new Image();
    uploadImg2.onload = () => {
      setPhoto2Loaded(true);
    };
    uploadedImage2Ref.current = uploadImg2;

    const logoImg = new Image();
    logoImg.onload = () => {
      setCustomLogoLoaded(true);
    };
    customLogoImgRef.current = logoImg;

    const insetImg = new Image();
    insetImg.onload = () => {
      setInsetPhotoLoaded(true);
    };
    insetPhotoRef.current = insetImg;

    // Trigger initial render when fonts are ready
    document.fonts.ready.then(() => {
      drawCanvas();
    });
  }, []);

  // Sync border color and elements with template changes
  useEffect(() => {
    const template = TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      setBorderColor(template.secondaryColor);
      // Auto adjust bottom bar styling if user chooses a preset
      if (template.id === 'somoy_style' || template.id === 'jamuna_style') {
        setBottomBarStyle('light-grid');
      } else if (template.id === 'channel24_style' || template.id === 'rtv_style') {
        setBottomBarStyle('dark-gradient');
      }
    }
  }, [selectedTemplate]);

  const applyPreset = (preset: ChannelPreset) => {
    setSelectedTemplate(preset.templateId);
    
    // Only overwrite name and logo if autoSyncNameLogo is enabled
    if (autoSyncNameLogo) {
      setChannelName(preset.channelName);
      setBuiltInLogo(preset.logo);
      
      // Auto populate URLs based on preset
      const cleanName = preset.channelName.toLowerCase().split('|')[0].trim().replace(/\s+/g, '');
      setWebsiteUrl(`www.${cleanName}.tv`);
      setFacebookHandle(`${cleanName}.news`);
      setYoutubeHandle(`${preset.channelName.replace(/\s+/g, '')}`);
    }
    
    setChannelStyle(preset.channelStyle);
    setBadgeType(preset.badgeType);
    setBadgeBgColor(preset.badgeBgColor);
    setBorderColor(preset.borderColor);
    if (preset.customBadgeText) {
      setCustomBadgeText(preset.customBadgeText);
    }
  };

  const applyNewsPreset = (news: typeof NEWS_PRESETS[0]) => {
    setHeadline(news.headline);
    setBadgeType(news.badge);
    setBadgeBgColor(news.badgeBg);
    if (news.badgeText) {
      setCustomBadgeText(news.badgeText);
      setBadgeType('custom');
    }
  };

  // Helper to draw custom vector shapes of logos/icons on Canvas
  const drawVectorIcon = (
    ctx: CanvasRenderingContext2D,
    type: string,
    cx: number,
    cy: number,
    size: number,
    color: string
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;

    if (type === 'globe') {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, size / 4, size / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - size / 2, cy);
      ctx.lineTo(cx + size / 2, cy);
      ctx.stroke();
    } else if (type === 'tv') {
      const w = size;
      const h = size * 0.75;
      const rx = cx - w / 2;
      const ry = cy - h / 2;
      ctx.strokeRect(rx, ry, w, h);
      ctx.beginPath();
      ctx.moveTo(cx, ry);
      ctx.lineTo(cx - w / 3, ry - h / 3);
      ctx.moveTo(cx, ry);
      ctx.lineTo(cx + w / 3, ry - h / 3);
      ctx.stroke();
    } else if (type === 'fire') {
      ctx.beginPath();
      ctx.moveTo(cx, cy + size / 2);
      ctx.bezierCurveTo(cx - size / 2, cy + size / 3, cx - size / 2, cy - size / 4, cx, cy - size / 2);
      ctx.bezierCurveTo(cx + size / 4, cy - size / 4, cx + size / 3, cy, cx + size / 4, cy + size / 3);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          cx + Math.cos(((18 + i * 72) * Math.PI) / 180) * (size / 2),
          cy - Math.sin(((18 + i * 72) * Math.PI) / 180) * (size / 2)
        );
        ctx.lineTo(
          cx + Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 4),
          cy - Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 4)
        );
      }
      ctx.closePath();
      ctx.fill();
    } else if (type === 'play') {
      ctx.beginPath();
      ctx.moveTo(cx - size / 3, cy - size / 2);
      ctx.lineTo(cx + size / 2, cy);
      ctx.lineTo(cx - size / 3, cy + size / 2);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'facebook') {
      ctx.fillStyle = '#1877f2';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(size * 0.7)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('f', cx + 1, cy + 2);
    } else if (type === 'youtube') {
      ctx.fillStyle = '#ff0000';
      const w = size * 1.1;
      const h = size * 0.8;
      const rx = cx - w / 2;
      const ry = cy - h / 2;
      const r = 6;
      ctx.beginPath();
      ctx.moveTo(rx + r, ry);
      ctx.lineTo(rx + w - r, ry);
      ctx.quadraticCurveTo(rx + w, ry, rx + w, ry + r);
      ctx.lineTo(rx + w, ry + h - r);
      ctx.quadraticCurveTo(rx + w, ry + h, rx + w - r, ry + h);
      ctx.lineTo(rx + r, ry + h);
      ctx.quadraticCurveTo(rx, ry + h, rx, ry + h - r);
      ctx.lineTo(rx, ry + r);
      ctx.quadraticCurveTo(rx, ry, rx + r, ry);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(cx - w / 6, cy - h / 4);
      ctx.lineTo(cx + w / 5, cy);
      ctx.lineTo(cx - w / 6, cy + h / 4);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'tiktok') {
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.lineWidth = size * 0.09;
      ctx.strokeStyle = '#25f4ee';
      ctx.beginPath();
      ctx.moveTo(cx - 1, cy - size * 0.3);
      ctx.lineTo(cx - 1, cy + size * 0.1);
      ctx.arc(cx - 1 - size * 0.15, cy + size * 0.1, size * 0.15, 0, Math.PI, false);
      ctx.stroke();

      ctx.strokeStyle = '#fe2c55';
      ctx.beginPath();
      ctx.moveTo(cx + 1, cy - size * 0.26);
      ctx.lineTo(cx + 1, cy + size * 0.14);
      ctx.arc(cx + 1 - size * 0.15, cy + size * 0.14, size * 0.15, 0, Math.PI, false);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.28);
      ctx.lineTo(cx, cy + size * 0.12);
      ctx.arc(cx - size * 0.15, cy + size * 0.12, size * 0.15, 0, Math.PI, false);
      ctx.bezierCurveTo(cx, cy - size * 0.28, cx + size * 0.15, cy - size * 0.26, cx + size * 0.22, cy - size * 0.1);
      ctx.stroke();
      ctx.restore();
    } else if (type === 'instagram') {
      const grad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.6);
      grad.addColorStop(0, '#fdf497');
      grad.addColorStop(0.3, '#fd5949');
      grad.addColorStop(0.6, '#d6249f');
      grad.addColorStop(1, '#285AEB');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      const r = size * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx + r * 0.45, cy - r * 0.45, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'somoy') {
      // Somoy TV logo: Orange circle with text 'সময়'
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(size * 0.44)}px 'Tiro Bangla', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('সময়', cx, cy + 1.5);
    } else if (type === 'channel24') {
      // Channel 24 logo: Blue circle with neon cyan border and elegant '24'
      ctx.fillStyle = '#0a2540';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(size * 0.52)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('24', cx, cy);
    } else if (type === 'rtv') {
      // RTV logo: Orange gradient circle with 'RTV'
      const radGrad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.5);
      radGrad.addColorStop(0, '#f97316');
      radGrad.addColorStop(1, '#ea580c');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `900 italic ${Math.round(size * 0.38)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RTV', cx, cy);
    } else if (type === 'banglavision') {
      // BanglaVision logo: Maroon circle with green crescent
      ctx.fillStyle = '#701a75';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Green crescent
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(cx - size * 0.08, cy, size * 0.32, 0.2 * Math.PI, 1.8 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(size * 0.38)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BV', cx + size * 0.1, cy);
    } else if (type === 'jamuna') {
      // Jamuna logo: Dark-red square, gold border, white/gold J
      const half = size / 2;
      ctx.fillStyle = '#7f1d1d';
      ctx.fillRect(cx - half, cy - half, size, size);

      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - half, cy - half, size, size);

      ctx.fillStyle = '#ffffff';
      ctx.font = `900 italic ${Math.round(size * 0.65)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('J', cx, cy - 2);
    } else if (type === 'ekattor') {
      // Ekattor logo: Red circle with '71'
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#111827';
      ctx.font = `900 ${Math.round(size * 0.5)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('71', cx, cy);
    } else if (type === 'independent') {
      // Independent: Diagonally split square, 'I' in center
      const half = size / 2;
      
      // Top right triangle (orange)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(cx - half, cy - half);
      ctx.lineTo(cx + half, cy - half);
      ctx.lineTo(cx + half, cy + half);
      ctx.closePath();
      ctx.fill();

      // Bottom left triangle (green)
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(cx - half, cy - half);
      ctx.lineTo(cx - half, cy + half);
      ctx.lineTo(cx + half, cy + half);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - half, cy - half, size, size);

      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.round(size * 0.65)}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('I', cx, cy);
    }

    ctx.restore();
  };

  // Main canvas drawing pipeline
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear everything
    ctx.clearRect(0, 0, 1080, 1080);

    const uploadedImage = uploadedImageRef.current;
    const uploadedImage2 = uploadedImage2Ref.current;
    const customLogoImg = customLogoImgRef.current;
    const insetPhoto = insetPhotoRef.current;
    const template = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];

    // Helper to draw cover fit image in a box
    const drawCoverImage = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
      const imgRatio = img.width / img.height;
      const boxRatio = w / h;
      let drawW, drawH, drawX, drawY;

      if (imgRatio > boxRatio) {
        drawH = h;
        drawW = img.width * (h / img.height);
        drawX = x - (drawW - w) / 2;
        drawY = y;
      } else {
        drawW = w;
        drawH = img.height * (w / img.width);
        drawX = x;
        drawY = y - (drawH - h) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip(); 
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    // ১. ব্যাকগ্রাউন্ড ক্যানভাস ও ফ্রেম টাইপ ডিফাইন করা
    // 'split-banner' has an elegant margin frame, 'full-overlay' draws image on full canvas
    const isSplitBanner = frameLayoutDesign === 'split-banner';
    
    ctx.fillStyle = "#0f172a"; // Base dark frame background
    ctx.fillRect(0, 0, 1080, 1080);

    // বাউন্ডারি বক্স সেটিংস
    const boxX = isSplitBanner ? 25 : 0;
    const boxY = isSplitBanner ? 25 : 0;
    const boxW = isSplitBanner ? 1030 : 1080;
    const boxH = isSplitBanner ? 735 : 740; // Headline bar divider line starts at Y=760 / Y=740

    // ২. খবরের মূল ছবি/ছবিসমূহ আঁকা (সিঙ্গেল বা স্প্লিট লেআউট)
    if (imageLayoutMode === 'single') {
      if (uploadedImage && uploadedImage.src && photoLoaded) {
        drawCoverImage(uploadedImage, boxX, boxY, boxW, boxH);
      } else {
        // Draw elegant single placeholder
        const grad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
        grad.addColorStop(0, '#1e1b4b');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // Grid accents
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = boxX + 60; i < boxX + boxW; i += 60) {
          ctx.beginPath(); ctx.moveTo(i, boxY); ctx.lineTo(i, boxY + boxH); ctx.stroke();
        }
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 24px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('এখানে খবরের মূল ছবিটি প্রদর্শিত হবে', boxX + boxW / 2, boxY + boxH / 2 - 10);
        ctx.fillStyle = '#94a3b8';
        ctx.font = `14px 'Hind Siliguri', sans-serif`;
        ctx.fillText('বাম পাশের "শিরোনাম ও ছবি" ট্যাব থেকে ছবি আপলোড করুন', boxX + boxW / 2, boxY + boxH / 2 + 25);
      }
    } else if (imageLayoutMode === 'split-horizontal') {
      // Side-by-Side Dual Photo Split
      const halfW = boxW / 2 - 2; // 4px middle gap
      
      // Photo 1 (Left Half)
      if (uploadedImage && uploadedImage.src && photoLoaded) {
        drawCoverImage(uploadedImage, boxX, boxY, halfW, boxH);
      } else {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(boxX, boxY, halfW, boxH);
        ctx.fillStyle = '#818cf8';
        ctx.font = `bold 18px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('ছবি ১ আপলোড করুন', boxX + halfW / 2, boxY + boxH / 2);
      }

      // Photo 2 (Right Half)
      if (uploadedImage2 && uploadedImage2.src && photo2Loaded) {
        drawCoverImage(uploadedImage2, boxX + halfW + 4, boxY, halfW, boxH);
      } else {
        ctx.fillStyle = '#311042';
        ctx.fillRect(boxX + halfW + 4, boxY, halfW, boxH);
        ctx.fillStyle = '#c084fc';
        ctx.font = `bold 18px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('ছবি ২ আপলোড করুন', boxX + halfW + 4 + halfW / 2, boxY + boxH / 2);
      }

      // Draw elegant thin divider line between photos
      ctx.fillStyle = borderColor;
      ctx.fillRect(boxX + halfW, boxY, 4, boxH);

    } else if (imageLayoutMode === 'split-vertical') {
      // Top-Bottom Dual Photo Split
      const halfH = boxH / 2 - 2; // 4px gap

      // Photo 1 (Top Half)
      if (uploadedImage && uploadedImage.src && photoLoaded) {
        drawCoverImage(uploadedImage, boxX, boxY, boxW, halfH);
      } else {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(boxX, boxY, boxW, halfH);
        ctx.fillStyle = '#818cf8';
        ctx.font = `bold 18px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('ছবি ১ (উপরে) আপলোড করুন', boxX + boxW / 2, boxY + halfH / 2);
      }

      // Photo 2 (Bottom Half)
      if (uploadedImage2 && uploadedImage2.src && photo2Loaded) {
        drawCoverImage(uploadedImage2, boxX, boxY + halfH + 4, boxW, halfH);
      } else {
        ctx.fillStyle = '#311042';
        ctx.fillRect(boxX, boxY + halfH + 4, boxW, halfH);
        ctx.fillStyle = '#c084fc';
        ctx.font = `bold 18px 'Hind Siliguri', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('ছবি ২ (নিচে) আপলোড করুন', boxX + boxW / 2, boxY + halfH + 4 + halfH / 2);
      }

      // Divider line
      ctx.fillStyle = borderColor;
      ctx.fillRect(boxX, boxY + halfH, boxW, 4);
    }

    // ৩. হেডলাইন বার বা শিরোনাম পটভূমি তৈরি (X: 0 to 1080)
    const bandY = isSplitBanner ? 760 : 740;
    const bandH = 1080 - bandY;

    if (bottomBarStyle === 'light-grid') {
      // Classic light-gray grid pattern (Somoy, RTV, Jamuna news card feel)
      ctx.fillStyle = '#f8fafc'; // Crisp bright background
      ctx.fillRect(0, bandY, 1080, bandH);

      // Draw modern aesthetic dotted/line grid
      ctx.save();
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 35;
      for (let x = 0; x < 1080; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, bandY);
        ctx.lineTo(x, 1000); // Stop before footer
        ctx.stroke();
      }
      for (let y = bandY; y < 1000; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1080, y);
        ctx.stroke();
      }
      ctx.restore();

    } else if (bottomBarStyle === 'dark-gradient') {
      // Premium dark mode linear gradient with secondary colors
      const grad = ctx.createLinearGradient(0, bandY, 1080, bandY + bandH);
      
      // Extract deep dark version of template primary color
      const baseCol = template.primaryColor;
      grad.addColorStop(0, '#020617'); // super dark slate
      grad.addColorStop(0.5, baseCol === '#1f2937' ? '#0f172a' : baseCol); // mid point custom
      grad.addColorStop(1, '#090514'); // dark bottom
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, bandY, 1080, bandH);

      // Subtle cyber grid dots
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      for (let x = 20; x < 1080; x += 40) {
        for (let y = bandY + 20; y < 1000; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

    } else {
      // Solid classic band
      ctx.fillStyle = template.primaryColor;
      ctx.fillRect(0, bandY, 1080, bandH);
    }

    // ৪. সেপারেটর চিকন কালার বার (Divider Bar separating Image & Text)
    // Drawn exactly on Y = bandY with a nice accent
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, bandY, 1080, 12);

    // ৫. ফুটার ব্যান্ডের ব্যাকগ্রাউন্ড (Y: 1000 to 1080)
    // Draw only if branding is enabled or footer background fits
    ctx.fillStyle = template.footerBg;
    ctx.fillRect(0, 1000, 1080, 80);

    // ৬. চিকন কাস্টম চারপাশের ফ্রেম বর্ডার আঁকা (Outer Frame)
    ctx.save();
    ctx.strokeStyle = borderColor; 
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, 1070, 1070);
    ctx.restore();

    // ৭. তারিখ ও সময় আঁকা (তারিখের চমৎকার ক্যাপসুল ব্যাজ)
    if (dateText.trim()) {
      ctx.save();
      ctx.font = `bold 20px 'Hind Siliguri', serif`;
      const dateWidth = getBengaliTextWidth(ctx, dateText, 20);
      
      const padX = 18;
      const dateBoxH = 38;
      const dateBoxW = dateWidth + padX * 2;
      const dateBoxX = 1010 - dateBoxW;
      const dateBoxY = bandY - 13; // Intersect dividing line nicely
      
      // Draw date capsule behind the text
      ctx.fillStyle = template.primaryColor;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(dateBoxX, dateBoxY, dateBoxW, dateBoxH, 19) : ctx.rect(dateBoxX, dateBoxY, dateBoxW, dateBoxH);
      ctx.fill();
      
      // Beautiful border for date capsule
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      // Draw date text
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(dateText, dateBoxX + dateBoxW / 2, dateBoxY + dateBoxH / 2 + 1.5);
      ctx.restore();
    }

    // ৮. কোণায় চমৎকার গোল্ডেন/লাল ব্রেকিং নিউজ বা লাইভ ব্যাজ
    if (badgeType !== 'none') {
      const resolvedBadgeText = badgeType === 'custom' ? customBadgeText : 
                                badgeType === 'breaking' ? 'ব্রেকিং নিউজ' : 'লাইভ';
      
      if (resolvedBadgeText.trim()) {
        ctx.save();
        ctx.font = "bold 25px 'Hind Siliguri', serif";
        const textWidth = getBengaliTextWidth(ctx, resolvedBadgeText, 25, 1.05);
        
        const dotWidthWithGap = badgeType === 'live' ? 30 : 0;
        const paddingX = 24;
        
        const badgeW = textWidth + dotWidthWithGap + paddingX * 2;
        const badgeH = 56;
        const badgeX = isSplitBanner ? 60 : 40;
        const badgeY = isSplitBanner ? 60 : 40;
        const r = badgeH / 2; // Capsule shape
        
        ctx.fillStyle = badgeBgColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeW, badgeH, r);
        } else {
          ctx.rect(badgeX, badgeY, badgeW, badgeH);
        }
        ctx.closePath();
        ctx.fill();

        // High contrast white border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = "middle";

        if (badgeType === 'live') {
          // Live glowing blinking red dot
          const dotRadius = 8;
          const dotX = badgeX + paddingX + dotRadius;
          const dotY = badgeY + badgeH / 2;
          
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = "left";
          ctx.fillText(resolvedBadgeText, dotX + dotRadius + 12, badgeY + badgeH / 2 + 1);
        } else {
          ctx.textAlign = "center";
          ctx.fillText(resolvedBadgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
        }
        ctx.restore();
      }
    }

    // ৯. প্রধান হেডলাইন বা খবরের শিরোনাম আঁকা (Headline Layout)
    const headlineLines = headline.split('\n');
    let fontSize = headlineSize; 
    ctx.font = `bold ${fontSize}px 'Hind Siliguri', serif`;

    if (autoSizeHeadline) {
      let currentMax = 1001;
      // Keep within bounds of 980px
      while (currentMax > 980 && fontSize > 16) {
        ctx.font = `bold ${fontSize}px 'Hind Siliguri', serif`;
        currentMax = 0;
        for (const line of headlineLines) {
          const w = getBengaliTextWidth(ctx, line, fontSize, 0.45, false);
          if (w > currentMax) {
            currentMax = w;
          }
        }
        if (currentMax > 980) {
          fontSize -= 2;
        }
      }
    }

    // Headline color styling based on light/dark themes
    ctx.fillStyle = bottomBarStyle === 'light-grid' ? '#0f172a' : '#ffffff'; // Deep black/slate vs high-end white text
    ctx.textBaseline = "middle";

    const centerY = bandY + (1000 - bandY) / 2 + headlineYOffset;
    const spacing = fontSize * headlineLineHeight;
    const totalHeight = (headlineLines.length - 1) * spacing;
    const startY = centerY - totalHeight / 2;

    headlineLines.forEach((lineText, idx) => {
      const lineY = startY + idx * spacing;
      ctx.font = `bold ${fontSize}px 'Hind Siliguri', serif`;
      const lineWidth = getBengaliTextWidth(ctx, lineText, fontSize, 0.45, false);
      const lineX = (1080 - lineWidth) / 2 + headlineXOffset;
      ctx.textAlign = "left";
      ctx.fillText(lineText, lineX, lineY);
    });

    // ১০. সেকেন্ডারি বৃত্তাকার বা চারকোণা ইনসেট ছবি আঁকা (Secondary Overlay Picture)
    if (showInsetImage && insetPhoto && insetPhoto.src && insetPhotoLoaded) {
      ctx.save();
      const halfSize = insetSize / 2;
      
      // Clip path for overlay inset shape
      ctx.beginPath();
      if (insetShape === 'circle') {
        ctx.arc(insetX, insetY, halfSize, 0, Math.PI * 2);
      } else {
        ctx.rect(insetX - halfSize, insetY - halfSize, insetSize, insetSize);
      }
      ctx.closePath();
      ctx.clip();

      // Cover scaling inside circular/square clip
      const imgRatio = insetPhoto.width / insetPhoto.height;
      let drawW, drawH, drawX, drawY;
      if (imgRatio > 1) {
        drawH = insetSize;
        drawW = insetPhoto.width * (insetSize / insetPhoto.height);
        drawX = insetX - drawW / 2;
        drawY = insetY - halfSize;
      } else {
        drawW = insetSize;
        drawH = insetPhoto.height * (insetSize / insetPhoto.width);
        drawX = insetX - halfSize;
        drawY = insetY - drawH / 2;
      }
      ctx.drawImage(insetPhoto, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Stroke border around inset
      ctx.save();
      ctx.strokeStyle = insetBorderColor;
      ctx.lineWidth = insetBorderWidth;
      ctx.beginPath();
      if (insetShape === 'circle') {
        ctx.arc(insetX, insetY, halfSize, 0, Math.PI * 2);
      } else {
        ctx.rect(insetX - halfSize, insetY - halfSize, insetSize, insetSize);
      }
      ctx.closePath();
      ctx.stroke();

      // Add neat white inner border accent
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (insetShape === 'circle') {
        ctx.arc(insetX, insetY, halfSize - insetBorderWidth / 2, 0, Math.PI * 2);
      } else {
        ctx.rect(insetX - halfSize + insetBorderWidth / 2, insetY - halfSize + insetBorderWidth / 2, insetSize - insetBorderWidth, insetSize - insetBorderWidth);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    } else if (showInsetImage) {
      // Draw secondary inset placeholder
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      if (insetShape === 'circle') {
        ctx.arc(insetX, insetY, insetSize / 2, 0, Math.PI * 2);
      } else {
        ctx.rect(insetX - insetSize / 2, insetY - insetSize / 2, insetSize, insetSize);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      if (insetShape === 'circle') {
        ctx.arc(insetX, insetY, insetSize / 2, 0, Math.PI * 2);
      } else {
        ctx.rect(insetX - insetSize / 2, insetY - insetSize / 2, insetSize, insetSize);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = `bold 12px 'Hind Siliguri', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('ওভারলে ছবি', insetX, insetY);
      ctx.restore();
    }

    // ১১. কাস্টম ফুটার ব্র্যান্ডিং ও সোশ্যাল লিংকস (Only drawn if showBranding is TRUE)
    if (showBranding) {
      ctx.save();
      let channelXOffset = 50;
      
      if (channelName.trim()) {
        ctx.save();
        let fontSetting = 'bold 32px "Inter", "Hind Siliguri", serif';
        ctx.font = fontSetting;
        
        const cTextWidth = getBengaliTextWidth(ctx, channelName, 32);
        const logoSize = 42;
        const logoGap = 12;
        const paddingX = 30; 
        
        const bW = cTextWidth + logoSize + logoGap + paddingX * 2;
        const bH = 70; 
        const bY = 1040 - bH / 2;

        let badgeBg = '#dc2626'; 
        let textCol = '#ffffff';

        if (channelStyle === 'badge-yellow') {
          badgeBg = '#fbbf24'; 
          textCol = '#111827';
        } else if (channelStyle === 'badge-black') {
          badgeBg = '#000000';
          textCol = '#ffffff';
        } else if (channelStyle === 'badge-red') {
          badgeBg = '#e11d48'; 
          textCol = '#ffffff';
        }

        if (channelStyle.startsWith('badge-')) {
          ctx.fillStyle = badgeBg;
          ctx.beginPath();
          const r = bH / 2; // Rounded capsule edges
          if (ctx.roundRect) {
            ctx.roundRect(channelXOffset, bY, bW, bH, r);
          } else {
            ctx.rect(channelXOffset, bY, bW, bH);
          }
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Brand custom logo or built-in vector inside footer badge
          if (customLogoEnabled && customLogoLoaded && customLogoImg && customLogoImg.src) {
            const logoX = channelXOffset + paddingX;
            const logoY = 1040 - logoSize / 2;

            ctx.save();
            ctx.beginPath();
            ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(customLogoImg, logoX, logoY, logoSize, logoSize);
            ctx.restore();

            ctx.fillStyle = textCol;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(channelName, logoX + logoSize + logoGap, 1040 + 1);
          } else {
            const logoX = channelXOffset + paddingX + logoSize / 2;
            drawVectorIcon(ctx, builtInLogo, logoX, 1040, logoSize, textCol);

            ctx.fillStyle = textCol;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(channelName, logoX + logoSize / 2 + logoGap, 1040 + 1);
          }

          channelXOffset += bW + 25; // Push socials position
        } else {
          // Classic glow or plain style
          if (channelStyle === 'glowing-gold') {
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 10;
            textCol = '#fbbf24';
          }
          
          ctx.fillStyle = textCol;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          
          if (customLogoEnabled && customLogoLoaded && customLogoImg && customLogoImg.src) {
            const lSize = 44;
            ctx.save();
            ctx.beginPath();
            ctx.arc(channelXOffset + lSize / 2, 1040, lSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(customLogoImg, channelXOffset, 1040 - lSize / 2, lSize, lSize);
            ctx.restore();
            channelXOffset += lSize + 12;
          } else {
            drawVectorIcon(ctx, builtInLogo, channelXOffset + 15, 1040, 32, textCol);
            channelXOffset += 45;
          }

          ctx.fillText(channelName, channelXOffset, 1040 + 1);
          channelXOffset += cTextWidth + 30;
        }
        ctx.restore();
      }

      // সোশ্যাল হ্যান্ডেল সমূহ ড্রয়িং করা
      const activeSocials = [];
      if (showWebsite && websiteUrl.trim()) {
        activeSocials.push({ type: 'globe', label: websiteUrl, color: '#38bdf8' });
      }
      if (showFacebook && facebookHandle.trim()) {
        activeSocials.push({ type: 'facebook', label: facebookHandle, color: '#3b82f6' });
      }
      if (showYoutube && youtubeHandle.trim()) {
        activeSocials.push({ type: 'youtube', label: youtubeHandle, color: '#ef4444' });
      }
      if (showTiktok && tiktokHandle.trim()) {
        activeSocials.push({ type: 'tiktok', label: tiktokHandle, color: '#22d3ee' });
      }
      if (showInstagram && instagramHandle.trim()) {
        activeSocials.push({ type: 'instagram', label: instagramHandle, color: '#f43f5e' });
      }

      let currentX = channelXOffset;
      const remainingWidth = 1010 - currentX;
      
      if (activeSocials.length > 0) {
        let itemFontSize = 20;
        ctx.font = `bold ${itemFontSize}px "Inter", sans-serif`;
        
        let totalItemsWidth = 0;
        const spacing = 25; 
        const iconTextGap = 8;
        const iconSize = 26;

        activeSocials.forEach(s => {
          const textWidth = ctx.measureText(s.label).width;
          totalItemsWidth += iconSize + iconTextGap + textWidth + spacing;
        });

        if (totalItemsWidth > remainingWidth && remainingWidth > 120) {
          itemFontSize = Math.max(13, Math.floor(itemFontSize * (remainingWidth / totalItemsWidth)));
          ctx.font = `bold ${itemFontSize}px "Inter", sans-serif`;
        }

        activeSocials.forEach(item => {
          const textWidth = ctx.measureText(item.label).width;
          drawVectorIcon(ctx, item.type, currentX + iconSize / 2, 1040, iconSize, item.color);
          
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.label, currentX + iconSize + iconTextGap, 1040 + 1);
          
          currentX += iconSize + iconTextGap + textWidth + spacing;
        });
      }
      ctx.restore();
    }

  }, [
    headline,
    dateText,
    selectedTemplate,
    channelName,
    channelStyle,
    customLogoEnabled,
    builtInLogo,
    showWebsite,
    websiteUrl,
    showFacebook,
    facebookHandle,
    showYoutube,
    youtubeHandle,
    showTiktok,
    tiktokHandle,
    showInstagram,
    instagramHandle,
    badgeType,
    customBadgeText,
    badgeBgColor,
    borderColor,
    headlineSize,
    headlineXOffset,
    headlineYOffset,
    autoSizeHeadline,
    headlineLineHeight,
    photoLoaded,
    photo2Loaded,
    customLogoLoaded,
    insetPhotoLoaded,
    imageLayoutMode,
    showBranding,
    frameLayoutDesign,
    bottomBarStyle,
    showInsetImage,
    insetShape,
    insetSize,
    insetX,
    insetY,
    insetBorderColor,
    insetBorderWidth
  ]);

  // Redraw trigger
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && uploadedImageRef.current) {
          uploadedImageRef.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && uploadedImageRef.current) {
          uploadedImageRef.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePhoto2UploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && uploadedImage2Ref.current) {
          uploadedImage2Ref.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInsetPhotoUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && insetPhotoRef.current) {
          insetPhotoRef.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogoUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && customLogoImgRef.current) {
          customLogoImgRef.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const link = document.createElement('a');
      link.download = `bengali-news-${channelName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'banner'}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      alert("ডাউনলোডে সমস্যা হয়েছে। অনুগ্রহ করে ব্রাউজার পারমিশন চেক করুন।");
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-6 flex flex-col items-center pb-12 selection:bg-purple-600 selection:text-white">
      
      {/* Modern Top Header Banner */}
      <header className="text-center mt-2 mb-8 max-w-3xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/60 border border-purple-800/60 rounded-full text-xs font-bold text-purple-400 mb-3 animate-pulse">
          <Sparkle className="w-3.5 h-3.5 fill-purple-400" />
          <span>প্রফেশনাল এইচডি নিউজ স্টুডিও</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
          বাংলা নিউজ ব্যানার জেনারেটর
        </h1>
      </header>

      {/* Main Working Deck */}
      <div id="bannerGeneratorCard" className="w-full max-w-7xl bg-slate-900 rounded-3xl shadow-2xl p-4 md:p-6 border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Modular Control Desk (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col">
          
          {/* Tab Navigation buttons - Streamlined to 3 super-intuitive tabs */}
          <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-2xl mb-4 overflow-x-auto gap-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === 'theme' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-[1.01]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              ১. থিম ও ব্র্যান্ডিং
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === 'content' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-[1.01]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              ২. শিরোনাম ও ছবি
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('advanced')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === 'advanced' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-[1.01]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              ৩. সাজসজ্জা ও সোশ্যাল
            </button>
          </div>

          {/* Dynamic Tab Contents */}
          <div className="bg-slate-800/40 border border-slate-800/80 rounded-2xl p-4 min-h-[480px] flex flex-col justify-between">
            
            {/* TAB 1: Theme & Branding (ফ্রেম ও প্রিসেট) */}
            {activeTab === 'theme' && (
              <div className="flex flex-col gap-4 animate-fadeIn max-h-[480px] overflow-y-auto pr-1">
                
                {/* 1. Frame Layout Design & Bottom Bar Style */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">নিউজ ফ্রেম ও ব্যাকগ্রাউন্ড ডিজাইন</span>
                  
                  {/* Frame Design Selector */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400">ফ্রেম লেআউট টাইপ</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'split-banner', name: '১. ক্লাসিক স্প্লিট ফ্রেম' },
                        { id: 'full-overlay', name: '২. ফুল স্ক্রিন ওভারলে' }
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrameLayoutDesign(f.id as any)}
                          className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer text-center ${
                            frameLayoutDesign === f.id 
                              ? 'bg-purple-600 text-white shadow' 
                              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar Background Texture Style */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400">শিরোনাম পটি ব্যাকগ্রাউন্ড স্টাইল</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'light-grid', name: 'সাদা গ্রিড' },
                        { id: 'dark-gradient', name: 'গাঢ় থিম' },
                        { id: 'solid', name: 'সলিড' }
                      ].map(b => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBottomBarStyle(b.id as any)}
                          className={`py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer text-center ${
                            bottomBarStyle === b.id 
                              ? 'bg-purple-600 text-white shadow' 
                              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Show/Hide Branding Controls */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-200">চ্যানেল ব্র্যান্ডিং ও লোগো</span>
                      <span className="text-[9px] text-slate-500">বন্ধ করলে সমস্ত লোগো ও সোশ্যাল প্যানেল মুছে যাবে</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showBranding} 
                        onChange={(e) => setShowBranding(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {showBranding && (
                    <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-slate-300">নাম ও লোগো অটো-সিন্ক</span>
                        <span className="text-[8px] text-slate-500">চ্যানেল থিম পাল্টালে নাম-লোগোও নিজে নিজে বদলাবে</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={autoSyncNameLogo} 
                          onChange={(e) => setAutoSyncNameLogo(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  )}
                </div>

                {/* 3. Preset Selectors */}
                <div>
                  <h3 className="text-xs font-black text-purple-400 mb-1.5 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5" />
                    চ্যানেল প্রিসেট ফ্রেম (Frame Presets)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {CHANNEL_PRESETS.map((preset) => {
                      const isSelected = selectedTemplate === preset.templateId;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className={`group p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 relative ${
                            isSelected 
                              ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/50' 
                              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              <span className="w-2.5 h-2.5 rounded-full border border-slate-950" style={{ backgroundColor: TEMPLATES.find(t=>t.id===preset.templateId)?.primaryColor }} />
                              <span className="w-2.5 h-2.5 rounded-full border border-slate-950" style={{ backgroundColor: TEMPLATES.find(t=>t.id===preset.templateId)?.secondaryColor }} />
                            </div>
                            <span className={`text-[11px] font-bold transition-colors ${isSelected ? 'text-purple-300' : 'text-slate-200 group-hover:text-white'}`}>
                              {preset.name}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Channel Custom Name & Logo Input (Only shown if branding is ON) */}
                {showBranding && (
                  <div className="flex flex-col gap-3.5 border-t border-slate-800/60 pt-3">
                    
                    {/* Channel custom Name input */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="chanName" className="block text-xs font-bold text-slate-300">
                          চ্যানেলের নাম (Channel Name)
                        </label>
                        {!autoSyncNameLogo && (
                          <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded-md font-bold">
                            নাম লক করা আছে
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        id="chanName"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="আপনার চ্যানেলের নাম লিখুন..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-purple-500 rounded-xl focus:outline-none text-xs font-bold text-white shadow-inner"
                      />
                    </div>

                    {/* Logo selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-300">চ্যানেল লোগো সেটিংস</span>
                        <label className="inline-flex items-center cursor-pointer gap-1.5">
                          <span className="text-[10px] text-slate-400">কাস্টম লোগো আপলোড?</span>
                          <input 
                            type="checkbox" 
                            checked={customLogoEnabled} 
                            onChange={(e) => setCustomLogoEnabled(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      {customLogoEnabled ? (
                        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUploadChange}
                            className="w-full text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-slate-800 file:text-white file:hover:bg-slate-700 cursor-pointer"
                            id="customLogoUpload"
                          />
                          <span className="text-[9px] text-slate-500">স্বচ্ছ পিএনজি (Transparent PNG) লোগো ব্যবহার করা ভালো।</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-1 bg-slate-950/50 p-1.5 rounded-xl border border-slate-850">
                          {[
                            { id: 'somoy', name: 'সময়' },
                            { id: 'channel24', name: '২৪' },
                            { id: 'rtv', name: 'RTV' },
                            { id: 'banglavision', name: 'বাংলাভিশন' },
                            { id: 'jamuna', name: 'যমুনা' },
                            { id: 'ekattor', name: '৭১' },
                            { id: 'independent', name: 'ইনডিপেন' },
                            { id: 'globe', name: '🌐 গ্লোব' },
                          ].map(icon => (
                            <button
                              key={icon.id}
                              type="button"
                              onClick={() => setBuiltInLogo(icon.id)}
                              className={`py-1 rounded-lg text-[10px] font-bold text-center transition duration-200 cursor-pointer ${
                                builtInLogo === icon.id 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-855'
                              }`}
                            >
                              {icon.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Highlight style */}
                    <div>
                      <label htmlFor="styleSelect" className="block text-xs font-bold text-slate-300 mb-1.5">
                        নাম ফুটানোর ডিজাইন স্টাইল
                      </label>
                      <select
                        id="styleSelect"
                        value={channelStyle}
                        onChange={(e) => setChannelStyle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="badge-red">🔴 লাল ব্যাকগ্রাউন্ড ব্যাজ (চোখে পড়ার মতো)</option>
                        <option value="badge-yellow">🟡 হলুদ ব্যাকগ্রাউন্ড ব্যাজ (সবচেয়ে উজ্জ্বল)</option>
                        <option value="badge-black">⚫ ক্লাসিক কালো ব্যাকগ্রাউন্ড ব্যাজ</option>
                        <option value="solid-white">⚪ সাধারণ ক্লাসিক সাদা টেক্সট</option>
                        <option value="glowing-gold">🌟 সোনালী উজ্জ্বল আভা (Glowing Gold)</option>
                      </select>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 2: News & Image Content (শিরোনাম ও ছবি) */}
            {activeTab === 'content' && (
              <div className="flex flex-col gap-4 animate-fadeIn max-h-[480px] overflow-y-auto pr-1">
                
                {/* News Headline */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="headlineInput" className="block text-xs font-bold text-slate-300">
                      প্রধান খবরের শিরোনাম (Bengali Headline)
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">লাইন পরিবর্তন করতে Enter চাপুন</span>
                  </div>
                  <textarea
                    id="headlineInput"
                    rows={3}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="এখানে খবরের মূল শিরোনামটি লিখুন..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl focus:outline-none text-xs text-white placeholder-slate-600 leading-normal"
                  />
                </div>

                {/* Date Input */}
                <div>
                  <label htmlFor="dateTextInput" className="block text-xs font-bold text-slate-300 mb-1.5">
                    তারিখ ও সময় (Date/Time Text)
                  </label>
                  <input
                    type="text"
                    id="dateTextInput"
                    value={dateText}
                    onChange={(e) => setDateText(e.target.value)}
                    placeholder="যেমন: ১০ জুলাই ২০രക്ഷা"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl focus:outline-none text-xs text-white"
                  />
                </div>

                {/* Media Grid Setup */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">ফটো ও মাল্টি-ছবি বিন্যাস</span>
                  
                  {/* Photo Mode Switcher */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400">খবরের ছবির ফ্রেম লেআউট</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'single', name: '১টি ছবি' },
                        { id: 'split-horizontal', name: 'পাশাপাশি ২টি' },
                        { id: 'split-vertical', name: 'উপরে-নিচে ২টি' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setImageLayoutMode(mode.id as any)}
                          className={`py-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer text-center ${
                            imageLayoutMode === mode.id 
                              ? 'bg-amber-600 text-white shadow' 
                              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          {mode.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo 1 Upload Box */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-300 font-bold">{imageLayoutMode !== 'single' ? 'প্রথম ছবি (Photo 1)' : 'খবরের মূল ছবি'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUploadChange}
                      className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-slate-900 file:text-white file:hover:bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {/* Photo 2 Upload Box (Only if split layout mode is active) */}
                  {imageLayoutMode !== 'single' && (
                    <div className="flex flex-col gap-1 border-t border-slate-900 pt-2 animate-fadeIn">
                      <span className="text-[10px] text-amber-400 font-bold">দ্বিতীয় ছবি (Photo 2)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto2UploadChange}
                        className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-slate-900 file:text-white file:hover:bg-slate-800 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Inset Overlay Image Layer (যেমন গোল বা স্কয়ার অতিরিক্ত স্পোর্টস ছবি বা রিপোর্টার) */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold text-purple-400">ইনসেট গোল/চারকোণা ওভারলে ছবি</span>
                      <span className="text-[9px] text-slate-500">টপ-আপ ছবি লেয়ার যোগ করুন (যেমন: বক্তা/ম্যাচ রেফারি)</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showInsetImage} 
                        onChange={(e) => setShowInsetImage(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {showInsetImage && (
                    <div className="flex flex-col gap-2 border-t border-slate-900 pt-2.5 mt-0.5 animate-fadeIn">
                      
                      {/* Upload Inset photo file */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-slate-300">ওভারলে ফাইল আপলোড করুন</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleInsetPhotoUploadChange}
                          className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-slate-900 file:text-white file:hover:bg-slate-800 cursor-pointer"
                        />
                      </div>

                      {/* Shape toggle */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>ওভারলে ছবির আকৃতি</span>
                        <div className="flex gap-1">
                          {['circle', 'square'].map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setInsetShape(s as any)}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                insetShape === s 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              {s === 'circle' ? 'বৃত্তাকার' : 'চারকোণা'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size slider */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>ওভারলে সাইজ (Size)</span>
                          <span className="text-purple-400 font-mono">{insetSize}px</span>
                        </div>
                        <input
                          type="range"
                          min={80}
                          max={350}
                          value={insetSize}
                          onChange={(e) => setInsetSize(Number(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* X and Y Positions */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex justify-between text-[9px] text-slate-400">
                            <span>ডানে-বামে (X)</span>
                            <span className="text-cyan-400 font-mono">{insetX}px</span>
                          </div>
                          <input
                            type="range"
                            min={100}
                            max={980}
                            value={insetX}
                            onChange={(e) => setInsetX(Number(e.target.value))}
                            className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex justify-between text-[9px] text-slate-400">
                            <span>উপরে-নিচে (Y)</span>
                            <span className="text-pink-400 font-mono">{insetY}px</span>
                          </div>
                          <input
                            type="range"
                            min={100}
                            max={980}
                            value={insetY}
                            onChange={(e) => setInsetY(Number(e.target.value))}
                            className="w-full accent-pink-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Border Color & Width */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-2">
                        <span className="font-bold">ওভারলে বর্ডার কালার</span>
                        <input
                          type="color"
                          value={insetBorderColor}
                          onChange={(e) => setInsetBorderColor(e.target.value)}
                          className="w-5 h-5 rounded bg-transparent border-0 cursor-pointer"
                        />
                      </div>

                    </div>
                  )}
                </div>

                {/* News Preset Topics */}
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                  <span className="text-[10px] uppercase font-black text-amber-400 block mb-1.5">দ্রুত শিরোনাম প্রিসেটস (Topic Templates)</span>
                  <div className="flex flex-wrap gap-1">
                    {NEWS_PRESETS.map((news, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyNewsPreset(news)}
                        className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-855 border border-slate-800 text-[10px] font-bold text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: news.badgeBg }} />
                        {news.category}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: Advanced Extras & Fine Tuning (সাজসজ্জা ও সোশ্যাল) */}
            {activeTab === 'advanced' && (
              <div className="flex flex-col gap-4 animate-fadeIn max-h-[480px] overflow-y-auto pr-1">
                
                {/* Corner badge Setup */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">কোণার ব্যাজ (Top-Left Badge)</span>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: 'breaking', name: 'ব্রেকিং' },
                      { id: 'live', name: '🔴 লাইভ' },
                      { id: 'custom', name: 'কাস্টম' },
                      { id: 'none', name: 'বন্ধ' }
                    ].map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBadgeType(b.id)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer text-center ${
                          badgeType === b.id 
                            ? 'bg-purple-600 text-white shadow' 
                            : 'bg-slate-900/60 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>

                  {badgeType === 'custom' && (
                    <input
                      type="text"
                      value={customBadgeText}
                      onChange={(e) => setCustomBadgeText(e.target.value)}
                      placeholder="ব্যাজ লেখা লিখুন..."
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 focus:border-purple-500 rounded-lg focus:outline-none text-xs text-white"
                    />
                  )}

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-[10px] text-slate-400 font-bold">ব্যাজ ব্যাকগ্রাউন্ড কালার</span>
                    <input
                      type="color"
                      value={badgeBgColor}
                      onChange={(e) => setBadgeBgColor(e.target.value)}
                      className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Sizing & Manual offset sliders */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">শিরোনাম সাইজ ও পজিশন</span>
                    <button
                      type="button"
                      onClick={() => {
                        setHeadlineSize(54);
                        setHeadlineXOffset(0);
                        setHeadlineYOffset(0);
                        setHeadlineLineHeight(1.2);
                      }}
                      className="text-[9px] bg-red-950/60 text-red-400 border border-red-800/20 px-2 py-0.5 rounded hover:bg-red-900 hover:text-white transition"
                    >
                      রিসেট করুন
                    </button>
                  </div>

                  {/* Size slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>ফন্ট সাইজ (Font Size)</span>
                      <span className="text-purple-400 font-mono">{headlineSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={90}
                      value={headlineSize}
                      onChange={(e) => setHeadlineSize(Number(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Line height slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>লাইনের ব্যবধান (Line Height)</span>
                      <span className="text-purple-400 font-mono">{headlineLineHeight.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.8}
                      max={1.8}
                      step={0.05}
                      value={headlineLineHeight}
                      onChange={(e) => setHeadlineLineHeight(Number(parseFloat(e.target.value).toFixed(2)))}
                      className="w-full accent-purple-500 h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Auto size toggler */}
                  <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-850 text-[10px]">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200">অটো-সাইজ ফিট (Auto Size)</span>
                      <span className="text-[8px] text-slate-500">লেখা বড় হলে নিজে নিজে ফিট হবে</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSizeHeadline}
                        onChange={(e) => setAutoSizeHeadline(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {/* Arrow Pad Controller and Offset Inputs */}
                  <div className="grid grid-cols-5 gap-2 items-center border-t border-slate-900 pt-2.5 mt-0.5">
                    <div className="col-span-3 flex flex-col gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>ডানে-বামে (X Offset)</span>
                          <span className="font-mono text-cyan-400 font-bold">{headlineXOffset}px</span>
                        </div>
                        <input
                          type="range"
                          min={-200}
                          max={200}
                          value={headlineXOffset}
                          onChange={(e) => setHeadlineXOffset(Number(e.target.value))}
                          className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-[9px] text-slate-400">
                          <span>উপরে-নিচে (Y Offset)</span>
                          <span className="font-mono text-purple-400 font-bold">{headlineYOffset}px</span>
                        </div>
                        <input
                          type="range"
                          min={-100}
                          max={100}
                          value={headlineYOffset}
                          onChange={(e) => setHeadlineYOffset(Number(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* D-pad nudge controls */}
                    <div className="col-span-2 flex justify-center">
                      <div className="grid grid-cols-3 gap-1 w-20 h-16 items-center justify-center font-sans scale-90">
                        <div />
                        <button
                          type="button"
                          onClick={() => setHeadlineYOffset(prev => prev - 4)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-xs active:scale-90 transition cursor-pointer"
                          title="উপরে"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <div />
                        
                        <button
                          type="button"
                          onClick={() => setHeadlineXOffset(prev => prev - 4)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-xs active:scale-90 transition cursor-pointer"
                          title="বামে"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setHeadlineXOffset(0);
                            setHeadlineYOffset(0);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-red-950 text-red-400 rounded border border-red-900/40 text-[9px] active:scale-90 transition cursor-pointer font-bold"
                          title="রিসেট"
                        >
                          C
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeadlineXOffset(prev => prev + 4)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-xs active:scale-90 transition cursor-pointer"
                          title="ডানে"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div />
                        <button
                          type="button"
                          onClick={() => setHeadlineYOffset(prev => prev + 4)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-xs active:scale-90 transition cursor-pointer"
                          title="নিচে"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <div />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social media handles switcher (Only if showBranding is TRUE) */}
                {showBranding && (
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col gap-2 animate-fadeIn">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">সোশ্যাল মিডিয়া ইউজারনেম</span>

                    {/* Website */}
                    <div className="flex flex-col gap-1.5 p-1.5 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-400">
                        <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> ওয়েবসাইট লিংক</span>
                        <input 
                          type="checkbox" 
                          checked={showWebsite}
                          onChange={(e) => setShowWebsite(e.target.checked)}
                          className="w-3.5 h-3.5 rounded accent-purple-600 cursor-pointer"
                        />
                      </div>
                      {showWebsite && (
                        <input
                          type="text"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-850 rounded text-[10px] text-white focus:outline-none"
                        />
                      )}
                    </div>

                    {/* Facebook */}
                    <div className="flex flex-col gap-1.5 p-1.5 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between text-[11px] font-bold text-indigo-400">
                        <span className="flex items-center gap-1.5"><Facebook className="w-3.5 h-3.5" /> ফেসবুক ইউজারনেম</span>
                        <input 
                          type="checkbox" 
                          checked={showFacebook}
                          onChange={(e) => setShowFacebook(e.target.checked)}
                          className="w-3.5 h-3.5 rounded accent-purple-600 cursor-pointer"
                        />
                      </div>
                      {showFacebook && (
                        <input
                          type="text"
                          value={facebookHandle}
                          onChange={(e) => setFacebookHandle(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-850 rounded text-[10px] text-white focus:outline-none"
                        />
                      )}
                    </div>

                    {/* YouTube */}
                    <div className="flex flex-col gap-1.5 p-1.5 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between text-[11px] font-bold text-red-400">
                        <span className="flex items-center gap-1.5"><Youtube className="w-3.5 h-3.5" /> ইউটিউব আইডি</span>
                        <input 
                          type="checkbox" 
                          checked={showYoutube}
                          onChange={(e) => setShowYoutube(e.target.checked)}
                          className="w-3.5 h-3.5 rounded accent-purple-600 cursor-pointer"
                        />
                      </div>
                      {showYoutube && (
                        <input
                          type="text"
                          value={youtubeHandle}
                          onChange={(e) => setYoutubeHandle(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-850 rounded text-[10px] text-white focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Border Color Picker */}
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-200">চিকন ফ্রেম বর্ডার কালার</span>
                    <span className="text-[9px] text-slate-500">বর্ডারের কালার ম্যানুয়ালি পরিবর্তন করুন</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 font-mono uppercase">{borderColor}</span>
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Status panel indicating what's selected */}
            <div className="border-t border-slate-800/60 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                রেন্ডার থিম: <b className="text-slate-200">{TEMPLATES.find(t=>t.id===selectedTemplate)?.name.split(' ')[0]}</b>
              </span>
              <span className="text-slate-500">
                ক্যানভাস সাইজ: <b>1080x1080 HD</b>
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Live Canvas Preview Panel (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-slate-900/40 rounded-3xl p-4 border border-slate-800/60 gap-4 self-start lg:sticky lg:top-4">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" /> 
              রিয়েল-টাইম লাইভ ক্যানভাস প্রিভিউ
            </span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-400 text-[10px] font-black border border-purple-800/40 uppercase">High Definition</span>
            </div>
          </div>
          
          {/* Main Visual interactive Canvas Box */}
          <div className="w-full max-w-lg aspect-square overflow-hidden bg-slate-950 rounded-2xl p-1.5 border border-slate-800 shadow-2xl relative group">
            <canvas 
              ref={canvasRef}
              id="bannerCanvas" 
              width={1080}
              height={1080}
              className="w-full h-auto object-contain rounded-xl"
            ></canvas>
            
            {/* Quick action floating helper */}
            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] text-slate-400 font-bold select-none pointer-events-none transition opacity group-hover:opacity-100 opacity-60">
              ফাইনাল আউটপুট ১০৮০x১০৮০ পিএক্স
            </div>
          </div>

          {/* Action Download Button */}
          <button 
            id="downloadBtn" 
            onClick={handleDownload}
            className="w-full max-w-lg bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 text-white text-base font-black py-4 px-6 rounded-2xl shadow-xl hover:shadow-purple-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-white/10 select-none active:scale-[0.98]"
          >
            <Download className="w-5 h-5 animate-bounce" />
            📥 হাই-কোয়ালিটি নিউজ ব্যানার ডাউনলোড করুন
          </button>

          {/* Helpful Tips Card for beginners */}
          <div className="w-full max-w-lg p-3 bg-slate-950/50 border border-slate-850 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-200">কুইক এডিটিং গাইড:</span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                ১. হেডলাইনে যেকোনো জায়গায় কীবোর্ডের <b>Enter</b> টিপে দ্বিতীয় লাইনে লিখতে পারেন।<br />
                ২. লেখা ঠিক মাঝখানে না থাকলে <b>"সাইজ ও পজিশন"</b> ট্যাব থেকে ডানে-বামে বা উপরে-নিচে সহজে সরিয়ে নিতে পারবেন।<br />
                ৩. মোবাইল ব্যবহারকারীগণ ব্যানার ডাউনলোডের পর গ্যালারিতে সরাসরি এইচডি ফাইল দেখতে পাবেন।
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
