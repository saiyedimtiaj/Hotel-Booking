import Select from 'react-select';
import countries from 'world-countries';

const formatCountries = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    name:country.name
}));

const SearchCountryes = ({handleChange}) => {
    return (
        <div>
            <Select
                placeholder='Anywhere'
                isClearable
                options={formatCountries}
                onChange={handleChange}
                formatOptionLabel={(options)=> (
                    <div className='flex items-end gap-1'>
                        <div>{options.label}</div>,
                        <span className='text-neutral-500 mb-[2px] text-xs'>{options.region}</span>
                    </div>
                )}
                classNames={{
                    control: () => 'border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                      ...theme.colors,
                      primary: 'black',
                      primary25: '#ffe4e6'
                    }
                  })}
            />
        </div>
    );
};

export default SearchCountryes;