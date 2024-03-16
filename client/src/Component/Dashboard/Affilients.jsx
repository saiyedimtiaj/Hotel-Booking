

const Affilients = ({analytics}) => {
    const totalPriceMap = new Map();
    analytics.forEach(affiliate => {
        if (totalPriceMap.has(affiliate.userEmail)) {
            totalPriceMap.set(affiliate.userEmail, totalPriceMap.get(affiliate.userEmail) + affiliate.totalPrice);
        } else {
            totalPriceMap.set(affiliate.userEmail, affiliate.totalPrice);
        }
    });

    // Create affiliates array with aggregated total prices
    const aggregatedAffiliates = Array.from(totalPriceMap, ([userEmail, totalPrice]) => {
        const userAffiliates = analytics.filter(affiliate => affiliate.userEmail === userEmail);
        return {
            userName: userAffiliates[0].userName,
            userEmail: userEmail,
            userProfile: userAffiliates[0].userProfile,
            totalPrice: totalPrice
        };
    });

    // Calculate top affiliates based on aggregated total prices
    const topAffiliates = aggregatedAffiliates.sort((a, b) => b.totalPrice - a.totalPrice).slice(0, 5);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Top Affiliates</h2>
            <div>
                {
                    topAffiliates?.map((user,index)=><div key={index} className="flex my-4 items-center justify-between gap -5">
                        <div className="flex items-center gap-1">
                            <img className="object-cover w-9 h-9 md:w-12 md:h-12 rounded-full" src={user?.userProfile} alt="" />
                            <div>
                                <h6 className="lg:text-base text-sm font-semibold">{user?.userName}</h6>
                                <p className="lg:text-base text-sm">{user?.userEmail}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="md:text-xl text-base font-semibold">${user?.totalPrice}</h4>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Affilients;