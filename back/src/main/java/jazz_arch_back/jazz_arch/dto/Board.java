package jazz_arch_back.jazz_arch.dto;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DialectOverride;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long boardNo;

    private String author;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ColumnDefault("0")
    private int viewCount;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
