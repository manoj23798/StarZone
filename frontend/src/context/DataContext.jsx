import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [services, setServices] = useState({
        men: [],
        women: [],
        contact: { phones: [], address: '', instagram: '' },
        homeContent: { heroTitle: 'Star Zone', heroSubtitle: '', heroTagline: '', heroImage: '' },
        offers: { slider: [], men: [], women: [] }
    });
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchData = async () => {
        try {
            const [resServices, resGallery] = await Promise.all([
                fetch(`${API_URL}/services`),
                fetch(`${API_URL}/gallery`)
            ]);

            if (!resServices.ok || !resGallery.ok) {
                throw new Error('Server returned an error');
            }

            const servicesData = await resServices.json();
            const galleryData = await resGallery.json();

            // Only update if we got valid objects, otherwise keep defaults
            if (servicesData && typeof servicesData === 'object' && !Array.isArray(servicesData)) {
                setServices(prev => ({
                    ...prev,
                    ...servicesData,
                    contact: servicesData.contact || prev.contact,
                    homeContent: servicesData.homeContent || prev.homeContent,
                    offers: servicesData.offers || prev.offers
                }));
            }

            if (Array.isArray(galleryData)) {
                setGallery(galleryData);
            }

            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            // Don't keep it loading forever, show whatever defaults we have
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateAllData = async (newData) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`${API_URL}/services/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });
            const updated = await res.json();
            if (res.ok) {
                setServices(updated);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Update error:', err);
            return false;
        }
    };

    const addGalleryItem = async (item) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`${API_URL}/gallery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item)
            });
            const newItem = await res.json();
            if (res.ok) {
                setGallery([newItem, ...gallery]);
            }
        } catch (err) {
            console.error('Gallery upload error:', err);
        }
    };

    const deleteGalleryItem = async (id) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`${API_URL}/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setGallery(gallery.filter(i => i._id !== id));
            }
        } catch (err) {
            console.error('Gallery delete error:', err);
        }
    };

    const updateService = async (gender, catIdx, sIdx, updatedItem) => {
        const newData = { ...services };
        newData[gender][catIdx].services[sIdx] = updatedItem;
        return await updateAllData(newData);
    };

    const addService = async (gender, categoryName, newItem) => {
        const newData = { ...services };
        const cat = newData[gender].find(c => c.category === categoryName);
        if (cat) {
            cat.services.push(newItem);
            return await updateAllData(newData);
        }
    };

    const deleteService = async (gender, catIdx, sIdx) => {
        const newData = { ...services };
        newData[gender][catIdx].services.splice(sIdx, 1);
        return await updateAllData(newData);
    };

    const uploadImage = async (file) => {
        const IMGBB_API_KEY = 'c1552e78533f6604dcbd6cc0aedff0c8';
        const formData = new FormData();
        formData.append('image', file);

        try {
            console.log("📤 Uploading to ImgBB...");
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.success) {
                console.log("✅ ImgBB Upload Success:", data.data.url);
                return data.data.url;
            } else {
                console.error("❌ ImgBB Error:", data.error);
                return null;
            }
        } catch (err) {
            console.error('Network Error during ImgBB upload:', err);
            return null;
        }
    };

    return (
        <DataContext.Provider value={{
            services, gallery, loading,
            updateAllData, updateService, addService, deleteService,
            addGalleryItem, deleteGalleryItem, uploadImage,
            refresh: fetchData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
