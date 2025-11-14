import { useState } from "react";
import { useRegion } from "./RegionContext";
import { useYear } from "./YearContext";

export default function useFetchHolidays() {
    const { year } = useYear();
    const { region } = useRegion();

    const [isLoading, setLoading] = useState(true);
    const [holidays, setHolidays] = useState([]);
    const [years, setYears] = useState([])

    const computeRegionKey = (loc) => {
        if (!loc || loc === 'Laden...') return 'heel Nederland';
        const parts = loc.split(" ");
        if (!parts[1]) return 'heel Nederland';
        return parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
      };

    const fetchHolidays = async (newYearReq, regionKeyParam) => {
        const yearToUse = newYearReq || yearReqHtml;
        const regionKey = regionKeyParam || computeRegionKey(currentLoc);
        try {
            setLoading(true);
            const response = await fetch(`https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${yearToUse}?output=json`);
            const json = await response.json();
            const items = json?.content?.[0]?.vacations || [];
            const schoolyear = json?.content?.[0]?.schoolyear?.trim?.() || '';
            setYears(schoolyear);

            const enrichedData = items.map(item => {
                const startDateStr = getDateByRegion(item.regions, regionKey, 'startdate');
                const endDateStr = getDateByRegion(item.regions, regionKey, 'enddate');

                return {
                    type: item.type.trim(),
                    startDate: startDateStr ? new Date(startDateStr).toLocaleDateString('nl',
                        { year: 'numeric', month: 'long', day: 'numeric' }) : '',
                    endDate: endDateStr ? new Date(endDateStr).toLocaleDateString('nl',
                        { year: 'numeric', month: 'long', day: 'numeric' }) : '',
                };
            });

            setHolidays(enrichedData);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getDateByRegion = (regions, regionKey, type) => {
        return (
            regions.find(r => r.region === regionKey)?.[type] ||
            regions.find(r => r.region === 'heel Nederland')?.[type] ||
            ''
        );
    };

    return { fetchHolidays, computeRegionKey, isLoading, holidays, years };
}