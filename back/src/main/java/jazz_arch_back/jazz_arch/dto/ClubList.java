package jazz_arch_back.jazz_arch.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClubList {

    @Id
    private String clubCode;
    private String title;
    private String regionCategory;
    private String mainRegion;
    private String subRegion;
    private String detlRegion;
    private String detlAddr;
    private String note;

}
